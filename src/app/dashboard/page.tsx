import React from 'react'
import { Activity, CheckCircle, AlertOctagon, TrendingDown, MapPin, Map } from 'lucide-react'
import NextDynamic from 'next/dynamic'
import prisma from '@/lib/prisma'

const LiveMap = NextDynamic(
  () => import('@/components/MapUI'),
  { ssr: false, loading: () => <div className="w-full h-80 bg-slate-100 animate-pulse rounded-lg flex items-center justify-center text-slate-400 font-medium">Booting Geospatial Engine...</div> }
)

export const dynamic = 'force-dynamic';

export default async function DashboardOverview() {
  const activeMonitored = await prisma.probationerProfile.count();
  const violationsCount = await prisma.complianceLog.count({ where: { status: 'VIOLATION' } });
  
  const allLogsCount = await prisma.complianceLog.count();
  const successLogsCount = await prisma.complianceLog.count({ where: { status: 'SUCCESS' } });
  
  const complianceRate = allLogsCount > 0 ? ((successLogsCount / allLogsCount) * 100).toFixed(1) + '%' : '100%';

  const criticalAlertsDb = await prisma.complianceLog.findMany({
    where: { status: { in: ['VIOLATION', 'MISSED'] } },
    orderBy: { timestamp: 'desc' },
    take: 3,
    include: {
      probationer: {
        include: { user: true }
      }
    }
  });

  const criticalAlerts = criticalAlertsDb.map(log => ({
    name: log.probationer.user.name,
    reason: log.status === 'VIOLATION' ? "Geofence Violation" : "Missed Liveness Check",
    time: new Date(log.timestamp).toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute:'2-digit' }),
    severity: log.status === 'VIOLATION' ? "CRITICAL" : "MEDIUM"
  }));

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Overview</h1>
          <p className="text-slate-500 mt-1">Real-time county compliance matrix.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-md shadow-sm hover:bg-slate-50 transition-colors text-sm">
            Export Audit Log
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow flex items-center hover:bg-blue-700 transition-colors text-sm">
            <Activity className="w-4 h-4 mr-2" />
            Live Monitor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Active Monitored', value: activeMonitored.toString(), trend: 'Live Database Feed', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Perfect Compliance', value: successLogsCount.toString(), trend: `${complianceRate} success rate`, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Violations (All Time)', value: violationsCount.toString(), trend: 'Alert triggers generated', icon: AlertOctagon, color: 'text-red-500', bg: 'bg-red-50' },
          { label: 'Avg Caseload / Officer', value: activeMonitored.toString(), trend: 'Optimal', icon: TrendingDown, color: 'text-slate-500', bg: 'bg-slate-100' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4 font-medium">{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6 z-0">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <Map className="w-5 h-5 mr-2 text-slate-400" />
            Live Geospatial Matrix
          </h2>
          <LiveMap />
        </div>

        <div className="col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Critical Alerts</h2>
          <div className="flex flex-col space-y-3">
             {criticalAlerts.length === 0 ? (
               <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-center text-sm font-medium text-slate-500">
                 No critical alerts logged.
               </div>
             ) : (
               criticalAlerts.map((alert, i) => (
                 <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex justify-between items-start">
                   <div>
                     <p className="text-sm font-bold text-slate-800">{alert.name}</p>
                     <p className="text-xs text-slate-500 mt-0.5">{alert.reason}</p>
                     <span className="text-[10px] text-slate-400 mt-1 block">{alert.time}</span>
                   </div>
                   <span className={`text-[10px] font-bold px-2 py-1 rounded bg-red-100 text-red-600`}>
                     {alert.severity}
                   </span>
                 </div>
               ))
             )}
          </div>
          <button className="w-full mt-4 py-2 border border-slate-200 rounded text-sm text-slate-600 font-medium hover:bg-slate-50 transition-colors">
            View All Triggers
          </button>
        </div>
      </div>
    </div>
  )
}

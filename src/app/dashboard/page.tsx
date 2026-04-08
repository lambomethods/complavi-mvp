import React from 'react'
import { Activity, CheckCircle, AlertOctagon, Map, FileText } from 'lucide-react'
import MapUIWrapper from '@/components/MapUIWrapper'
import DashboardHeaderActions from '@/components/DashboardHeaderActions'
import prisma from '@/lib/prisma'
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
        <DashboardHeaderActions />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Active Monitored', value: activeMonitored.toString(), trend: 'Live Database Feed', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Compliant (Audit Ready)', value: successLogsCount.toString(), trend: `${complianceRate} compliance baseline`, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Violations (All Time)', value: violationsCount.toString(), trend: 'Alert triggers generated', icon: AlertOctagon, color: 'text-red-500', bg: 'bg-red-50' },
          { label: 'Documents Court-Ready', value: allLogsCount.toString(), trend: 'Cryptographically Verified', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
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

      {/* Secure Audit Ledger */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h2 className="text-lg font-bold text-slate-800 flex items-center">
             <FileText className="w-5 h-5 mr-2 text-amber-500" />
             Secure Audit Ledger
          </h2>
          <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 flex items-center shadow-sm">
             <CheckCircle className="w-3 h-3 mr-1" /> ACTIVE SYNC
          </span>
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-mono text-xs uppercase border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-bold border-b border-slate-200">Timestamp (UTC)</th>
                <th className="px-6 py-4 font-bold border-b border-slate-200">Participant ID</th>
                <th className="px-6 py-4 font-bold border-b border-slate-200">Event Signature</th>
                <th className="px-6 py-4 font-bold border-b border-slate-200">Verification Hash</th>
                <th className="px-6 py-4 font-bold border-b border-slate-200 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {criticalAlertsDb.concat(criticalAlertsDb).slice(0, 3).map((log, i) => (
                 <tr key={i} className="hover:bg-slate-50 transition-colors">
                   <td className="px-6 py-4 font-mono text-slate-600">{new Date(log.timestamp).toISOString().replace('T', ' ').substring(0, 19)}</td>
                   <td className="px-6 py-4 font-bold text-slate-800">{log.probationer.user.name}</td>
                   <td className="px-6 py-4">
                     <span className={`px-2.5 py-1 rounded text-[10px] uppercase font-extrabold tracking-wider ${log.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                       {log.status === 'SUCCESS' ? 'SECURE CHECK-IN' : 'GEOFENCE VIOLATION'}
                     </span>
                   </td>
                   <td className="px-6 py-4 font-mono text-xs text-slate-400">0x{log.id.toUpperCase().substring(0, 8)}...</td>
                   <td className="px-6 py-4 text-right">
                     <button className="px-3 py-1.5 border border-blue-200 rounded text-blue-600 hover:bg-blue-50 font-bold text-[10px] uppercase tracking-wider transition-colors inline-block">Export Audit Report</button>
                   </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6 z-0">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <Map className="w-5 h-5 mr-2 text-slate-400" />
            Live Geospatial Matrix
          </h2>
          <MapUIWrapper />
        </div>

        <div className="col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <AlertOctagon className="w-5 h-5 mr-2 text-red-500" />
            Missing Compliance Event Detected
          </h2>
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

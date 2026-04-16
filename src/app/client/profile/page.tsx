import React from 'react';
import prisma from '@/lib/prisma';
import { User, ShieldAlert, Calendar, History, Mail } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const profile = await prisma.probationerProfile.findUnique({
    where: { id: "marcus-t-mock-id" },
    include: {
      user: true,
      officer: true,
      complianceLogs: { orderBy: { timestamp: 'desc' }, take: 8 }
    }
  });

  if (!profile) {
    return <div className="p-6 text-center text-slate-500 font-bold mt-10">System Profile Not Found. Contact Administrator.</div>;
  }

  const isCompliant = profile.complianceLogs[0]?.status === 'SUCCESS';

  return (
    <div className="p-6 pb-32">
      <div className="flex items-center space-x-4 mb-8 pl-2 mt-4">
        <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center border-4 border-white shadow-md">
          <User className="w-8 h-8 text-slate-600" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">{profile.user.name}</h1>
          <p className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded inline-block mt-1 border border-slate-200">ID: {profile.id.split('-')[0].toUpperCase()}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Status</span>
          <div className={`mt-1 font-extrabold text-sm ${isCompliant ? 'text-emerald-500' : 'text-amber-500'}`}>
            {isCompliant ? 'COMPLIANT' : 'PENDING'}
          </div>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Risk Level</span>
          <div className="mt-1 font-extrabold text-sm text-slate-700">{profile.riskLevel}</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 mb-6">
        <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-5 border-b border-slate-50 pb-3">Case Parameters</h3>
        
        <div className="space-y-5">
           <div className="flex items-center justify-between">
             <div className="flex items-center text-sm text-slate-600 font-medium">
               <ShieldAlert className="w-4 h-4 mr-2 text-slate-400" /> System UID
             </div>
             <span className="font-mono text-xs font-bold text-slate-800 bg-slate-50 px-2 py-1 rounded">{profile.caseNumber}</span>
           </div>
           
           <div className="flex items-center justify-between">
             <div className="flex items-center text-sm text-slate-600 font-medium">
               <Calendar className="w-4 h-4 mr-2 text-slate-400" /> Scheduled End
             </div>
             <span className="font-mono text-xs font-bold text-slate-800 bg-slate-50 px-2 py-1 rounded">
               {new Date(profile.probationEnd).toLocaleDateString('en-US', { timeZone: 'UTC' })}
             </span>
           </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 shadow-xl shadow-blue-600/20 text-white mb-6 relative overflow-hidden">
        <div className="absolute -top-4 -right-4 p-4 opacity-10">
          <User className="w-32 h-32" />
        </div>
        <h3 className="text-[10px] font-bold uppercase text-blue-200 tracking-widest mb-1 shadow-sm">Assigned Officer</h3>
        <p className="text-xl font-extrabold mb-5 drop-shadow-sm">{profile.officer?.name || 'Unassigned'}</p>
        
        <a href={`mailto:${profile.officer?.email || ''}`} className="bg-white text-blue-700 px-5 py-2.5 rounded-xl text-xs font-extrabold inline-flex items-center hover:bg-blue-50 transition-colors shadow-sm">
          <Mail className="w-4 h-4 mr-2" /> Message Officer
        </a>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
        <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-5 flex items-center border-b border-slate-50 pb-3">
          <History className="w-4 h-4 mr-1.5" /> Compliance Log
        </h3>
        <div className="space-y-4">
          {profile.complianceLogs.length === 0 ? (
            <p className="text-xs text-slate-400 font-medium italic text-center py-4">No check-ins logged into registry.</p>
          ) : (
            profile.complianceLogs.map((log) => (
              <div key={log.id} className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">{new Date(log.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                <span className={`font-extrabold tracking-wider ${log.status === 'SUCCESS' ? 'text-emerald-500' : 'text-rose-500'}`}>{log.status}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState } from 'react';
import { Activity } from 'lucide-react';

export default function DashboardHeaderActions() {
  const [monitoring, setMonitoring] = useState(false);

  return (
    <div className="flex space-x-3">
      <button 
        onClick={() => alert("Audit Log exported as CSV! (This is an MVP stub)")}
        className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-md shadow-sm hover:bg-slate-50 transition-colors text-sm"
      >
        Export Audit Log
      </button>
      <button 
        onClick={() => {
           setMonitoring(!monitoring);
           alert(monitoring ? "Live Monitor Deactivated" : "Live Monitor Activated. Establishing persistent WebSockets to probationer apps...");
        }}
        className={`px-4 py-2 font-medium rounded-md shadow flex items-center transition-colors text-sm ${monitoring ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
      >
        <Activity className={`w-4 h-4 mr-2 ${monitoring ? 'animate-pulse' : ''}`} />
        {monitoring ? 'Monitoring Active' : 'Live Monitor'}
      </button>
    </div>
  );
}

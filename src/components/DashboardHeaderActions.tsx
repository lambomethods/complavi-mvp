"use client";
import React, { useState } from 'react';
import { Activity, RefreshCcw } from 'lucide-react';

export default function DashboardHeaderActions() {
  const [monitoring, setMonitoring] = useState(false);

  return (
    <div className="flex space-x-3">
      <button 
        onClick={async () => {
           if(confirm("Reset Demo Architecture? This wipes the server-lock allowing you to run the phone pitch again.")) {
               await fetch('/api/demo-reset', { method: 'POST' });
               alert("Server Locks cleared! Hard refresh your phone app to loop the pitch again.");
               window.location.reload();
           }
        }}
        className="px-4 py-2 bg-red-50 border border-red-200 text-red-600 font-bold rounded-md shadow-sm hover:bg-red-100 transition-colors text-sm flex items-center"
      >
        <RefreshCcw className="w-4 h-4 mr-2" />
        Reset Pitch
      </button>
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

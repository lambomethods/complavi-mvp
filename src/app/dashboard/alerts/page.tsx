import React from 'react'
import { AlertTriangle, Search } from 'lucide-react'

export const dynamic = 'force-dynamic';

export default function AlertsPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto w-full">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-6">Active Alerts Matrix</h1>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="font-bold text-slate-800">Compliance Review Required</span>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input type="text" placeholder="Search incidents..." className="pl-9 pr-4 py-1.5 border border-slate-300 rounded text-sm outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>
        <div className="p-12 text-center">
            <AlertTriangle className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700">Matrix Clear</h3>
            <p className="text-sm text-slate-500 mt-1">There are no outstanding geofence or identity violations at this time.</p>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import { Settings, Shield, Map } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto w-full">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-6 flex items-center">
        <Settings className="w-8 h-8 mr-3 text-slate-400" />
        System Rules & Geofences
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
           <h2 className="text-lg font-bold text-slate-800 flex items-center mb-4">
             <Shield className="w-5 h-5 mr-2 text-blue-500" /> Automated Compliance
           </h2>
           <div className="space-y-4">
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg border border-slate-100">
                 <div>
                   <p className="font-bold text-slate-800 text-sm">Strict Identity Check Rules</p>
                   <p className="text-xs text-slate-500">Require high confidence match</p>
                 </div>
                 <div className="w-10 h-6 bg-blue-600 rounded-full relative cursor-pointer shadow-inner">
                   <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow"></div>
                 </div>
              </div>
           </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
           <h2 className="text-lg font-bold text-slate-800 flex items-center mb-4">
             <Map className="w-5 h-5 mr-2 text-emerald-500" /> Global Matrix Data
           </h2>
           <p className="text-sm text-slate-600 mb-4">
              Exclusion and Inclusion zones are traditionally populated by Case Administrators or synchronized via Government APIs upon court ruling.
           </p>
           <button className="px-4 py-2 bg-white border border-slate-300 rounded shadow-sm text-sm font-bold text-slate-700 hover:bg-slate-50 w-full mb-3 transition-colors">Sync County Rules Engine</button>
           <button className="px-4 py-2 bg-slate-900 rounded text-sm font-bold text-white hover:bg-slate-800 w-full transition-colors shadow">Provision New Vector Zone</button>
        </div>
      </div>
    </div>
  )
}

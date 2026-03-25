import React from 'react'
import Link from 'next/link'
import { ArrowLeft, User, Fingerprint, MapPin, Target, CheckCircle2, ShieldAlert, History } from 'lucide-react'

export default function ProbationerProfile({ params }: { params: { id: string } }) {
  // Dummy data generated for the Loom demo
  const profile = {
    id: params.id,
    name: 'Marcus T.',
    dob: '11/14/1994',
    status: 'VIOLATION - EXCLUSION ZONE',
    riskLevel: 'MEDIUM',
    caseNumber: 'CR-2025-0199',
    officer: 'OFC. R. Davis',
  }

  const complianceLogs = [
    { id: 1, type: 'FaceID Liveness', result: 'PASSED', time: 'Today, 08:00 AM', geo: 'Verified inside inclusion zone', icon: Fingerprint, color: 'text-emerald-500' },
    { id: 2, type: 'Geofence Ping', result: 'FAILED', time: 'Today, 11:42 AM', geo: 'Crossed into Exclusion Zone 4 (Main St)', icon: MapPin, color: 'text-red-500' },
    { id: 3, type: 'Officer Override', result: 'WARNING ISSUED', time: 'Today, 11:45 AM', geo: 'Manual ping triggered', icon: ShieldAlert, color: 'text-amber-500' },
  ]

  return (
    <div className="p-8 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="mb-6">
        <Link href="/dashboard/probationers" className="text-slate-500 hover:text-slate-900 flex items-center text-sm font-medium mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Caseload Matrix
        </Link>
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-slate-200 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
              <User className="h-8 w-8 text-slate-500" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{profile.name}</h1>
              <p className="font-mono text-sm text-slate-500">{profile.id} • Case: {profile.caseNumber}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider border border-red-200 mb-2 shadow-sm">
              {profile.status}
            </span>
            <span className="text-xs text-slate-500 font-medium">Risk: <strong className="text-slate-800">{profile.riskLevel}</strong></span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Quick Intel */}
        <div className="col-span-1 flex flex-col space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2 mb-3">Supervision Rules</h3>
            <ul className="text-sm space-y-3">
              <li className="flex items-start">
                <Target className="w-4 h-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
                <span className="text-slate-600 font-medium tracking-tight">Daily Liveness Check (08:00 Window)</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 text-red-500 mr-2 mt-0.5 shrink-0" />
                <span className="text-slate-600 font-medium tracking-tight">Exclusion Zones (Downtown, Dist 4)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" />
                <span className="text-slate-600 font-medium tracking-tight">Employment zone (Mon-Fri 9-5)</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2 mb-3">Identity Tokens</h3>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center text-center">
               <Fingerprint className="w-10 h-10 text-blue-500 mb-3" />
               <span className="text-xs font-bold text-slate-800">Biometric Template Registered</span>
               <span className="text-[10px] text-slate-400 mt-1.5 font-mono bg-white px-2 py-1 rounded border border-slate-200">SHA-256: 8f42a9...c3b1</span>
            </div>
          </div>
        </div>

        {/* Right Column / Map & Timeline */}
        <div className="col-span-1 md:col-span-2 flex flex-col space-y-6">
          {/* Geospatial Map Placeholder */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-3">Last Known Vector</h3>
            <div 
              className="w-full h-64 bg-slate-50 rounded-lg border border-slate-200 flex flex-col items-center justify-center relative overflow-hidden"
              style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '16px 16px' }}
            >
               <div className="z-10 flex flex-col items-center">
                 <div className="relative">
                   <div className="absolute -inset-2 bg-red-500 rounded-full animate-ping opacity-20"></div>
                   <MapPin className="w-8 h-8 text-red-600 drop-shadow-lg mb-2 relative z-10" />
                 </div>
                 <span className="bg-white px-3 py-1.5 rounded-md text-xs font-mono border border-slate-200 font-bold text-slate-700 shadow-sm mt-2">
                   Lat: 34.0522 • Lng: -118.2437
                 </span>
               </div>
            </div>
          </div>

          {/* Audit Log */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 flex items-center">
                <History className="w-4 h-4 mr-2 text-slate-500" />
                Immutable Audit Log
              </h3>
              <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-md border border-blue-200">Last 24 Hours</span>
            </div>
            <div className="divide-y divide-slate-100">
              {complianceLogs.map((log) => (
                <div key={log.id} className="p-5 flex items-start hover:bg-slate-50 transition-colors">
                  <div className={`mt-0.5 rounded-md p-2 bg-white border border-slate-200 shadow-sm ${log.color}`}>
                    <log.icon className="w-5 h-5" />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900">{log.type}</span>
                      <span className="text-xs text-slate-400 font-medium">{log.time}</span>
                    </div>
                    <p className="text-sm font-bold text-slate-700 mt-1">{log.result}</p>
                    <p className="text-xs text-slate-500 mt-1">{log.geo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

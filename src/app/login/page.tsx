import React from 'react'
import Link from 'next/link'
import { Shield, Lock, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-8">
        <div className="flex justify-center mb-6">
          <Shield className="w-16 h-16 text-blue-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-white text-center mb-2">Restricted Access</h1>
        <p className="text-slate-400 text-center text-sm mb-8">
          Authorized Court and Agency Personnel Only
        </p>

        <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 mb-6">
          <div className="flex items-start space-x-3 text-sm text-slate-300">
            <Lock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p>
              Please insert your Department-Issued SmartCard or authenticate via Enterprise SSO to access the live directory.
            </p>
          </div>
        </div>

        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-8">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <p className="text-xs text-red-200">
              Unauthorized access to this system is strictly prohibited and actively monitored.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <button className="w-full bg-slate-800 text-slate-400 cursor-not-allowed py-3 rounded-lg font-bold transition-colors opacity-50 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin mr-3"></div>
            Awaiting SmartCard...
          </button>
          
          <Link href="/" className="block w-full text-center text-sm text-blue-500 hover:text-blue-400 transition-colors mt-4">
            Return to Public Portal
          </Link>
        </div>
      </div>
      
      <p className="mt-8 text-slate-600 font-mono text-[10px] uppercase tracking-widest">
        COMPLAVION LLC Secure Infrastructure
      </p>
    </div>
  )
}

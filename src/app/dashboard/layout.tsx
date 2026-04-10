import React from 'react'
import Link from 'next/link'
import { Shield, Users, AlertTriangle, Settings, LogOut, BarChart2 } from 'lucide-react'
import DashboardAuth from '@/components/DashboardAuth'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardAuth>
      <div className="flex h-screen bg-slate-50 text-slate-900">
      
      {/* Sidebar - Federal Navy */}
      <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col shadow-xl z-20 print:hidden">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
          <Shield className="w-6 h-6 text-blue-500 mr-2" />
          <span className="font-bold text-lg tracking-widest text-white">COMPLAVI <span className="text-slate-500 font-mono text-xs ml-1">v1.0</span></span>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1">
          <Link href="/dashboard" className="flex items-center px-3 py-2.5 bg-blue-600/20 text-blue-400 rounded-md font-medium text-sm transition-colors border-l-2 border-blue-500">
            <BarChart2 className="w-5 h-5 mr-3" />
            Overview
          </Link>
          <Link href="/dashboard/probationers" className="flex items-center px-3 py-2.5 text-slate-300 hover:bg-slate-800 hover:text-white rounded-md font-medium text-sm transition-colors border-l-2 border-transparent hover:border-slate-500">
            <Users className="w-5 h-5 mr-3" />
            Caseload Matrix
          </Link>
          <Link href="/dashboard/alerts" className="flex items-center px-3 py-2.5 text-slate-300 hover:bg-slate-800 hover:text-white rounded-md font-medium text-sm transition-colors border-l-2 border-transparent hover:border-slate-500">
            <AlertTriangle className="w-5 h-5 mr-3 text-red-400" />
            Active Alerts <span className="ml-auto bg-red-500/20 text-red-400 py-0.5 px-2 rounded-full text-xs">3</span>
          </Link>
          <Link href="/dashboard/settings" className="flex items-center px-3 py-2.5 text-slate-300 hover:bg-slate-800 hover:text-white rounded-md font-medium text-sm transition-colors border-l-2 border-transparent hover:border-slate-500">
            <Settings className="w-5 h-5 mr-3" />
            System Rules
          </Link>
        </nav>
        
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex flex-col justify-center items-center text-xs font-bold text-slate-400">
              AD
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-white">Admin Console</p>
              <p className="text-[10px] text-slate-500 uppercase font-mono">Secured Port</p>
            </div>
          </div>
          <button className="text-slate-500 hover:text-red-400 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative print:overflow-visible print:bg-white print:h-auto">
        {/* Top Header / Breadcrumbs */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 shadow-sm justify-between z-10 print:hidden">
          <div className="flex items-center text-sm font-medium text-slate-500">
            <span className="text-blue-600 font-bold uppercase tracking-wide text-xs bg-blue-50 px-2 py-1 rounded">Court Intranet</span>
            <span className="mx-2">/</span>
            <span className="text-slate-800">Global Overview</span>
          </div>
          <div className="flex items-center space-x-4">
             <div className="flex items-center text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1.5 rounded border border-slate-200">
               <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
               NETWORK: ENCRYPTED
             </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-auto bg-slate-50/50 relative print:overflow-visible print:bg-white">
           {children}
        </div>
      </main>
    </div>
    </DashboardAuth>
  )
}

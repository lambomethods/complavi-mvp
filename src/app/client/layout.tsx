import React from 'react'
import ClientBottomNav from '@/components/ClientBottomNav'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-100 min-h-screen text-slate-900 flex justify-center pb-20 sm:py-10">
      {/* Mobile constraint width for desktop viewing */}
      <div className="w-full max-w-md bg-white min-h-[100vh] sm:min-h-[85vh] sm:rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col border border-slate-200">
         {/* Simple header */}
         <header className="px-6 py-5 flex items-center justify-between bg-white z-10 shadow-sm">
           <span className="font-extrabold tracking-widest text-slate-800 text-lg">COMPLAVI</span>
           <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shadow-inner">
             MT
           </div>
         </header>
         
         <div className="flex-1 overflow-auto bg-slate-50/30">
           {children}
         </div>

         <ClientBottomNav />
      </div>
    </div>
  )
}

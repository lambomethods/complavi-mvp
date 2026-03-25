import React from 'react'

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

         {/* Bottom Mobile Navigation */}
         <nav className="absolute bottom-0 w-full bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-400 z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
           <a href="#check-in" className="flex flex-col items-center text-blue-600 transition-colors">
             <div className="bg-blue-50 p-2 rounded-xl mb-1 text-blue-600">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" /></svg>
             </div>
             Check In
           </a>
           <a href="#resources" className="flex flex-col items-center hover:text-slate-700 transition-colors">
             <div className="p-2 mb-1">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
             </div>
             Resources
           </a>
           <a href="#profile" className="flex flex-col items-center hover:text-slate-700 transition-colors">
             <div className="p-2 mb-1">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
             </div>
             Profile
           </a>
         </nav>
      </div>
    </div>
  )
}

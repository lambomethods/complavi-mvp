'use client'
import React, { useEffect, useState } from 'react'

export default function DashboardAuth({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    if (localStorage.getItem('founder_access') === 'true') {
      setAuthed(true)
    } else {
      setTimeout(() => {
          const pin = prompt('SYSTEM LOCKED: Enter Administrative Override PIN:')
          if (pin === '2026') {
            localStorage.setItem('founder_access', 'true')
            setAuthed(true)
          } else {
            window.location.href = '/login'
          }
      }, 500)
    }
  }, [])

  if (!mounted || !authed) {
      return (
          <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">Verifying Access Level...</p>
          </div>
      )
  }
  
  return <>{children}</>
}

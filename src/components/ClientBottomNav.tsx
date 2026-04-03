"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fingerprint, Zap, User } from 'lucide-react';

export default function ClientBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Check In', href: '/client/check-in', icon: Fingerprint },
    { name: 'Resources', href: '/client/resources', icon: Zap },
    { name: 'Profile', href: '/client/profile', icon: User },
  ];

  return (
    <nav className="absolute bottom-0 w-full bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center text-[11px] font-bold uppercase tracking-wider z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.name} href={item.href} className={`flex flex-col items-center transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-700'}`}>
            <div className={`p-2 mb-1 rounded-xl transition-colors ${isActive ? 'bg-blue-50 text-blue-600' : ''}`}>
              <item.icon className="w-5 h-5" />
            </div>
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}

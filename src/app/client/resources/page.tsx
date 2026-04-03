import React from 'react';
import { Briefcase, Home, Shield, HeartHandshake } from 'lucide-react';

export default function ResourcesPage() {
  const categories = [
    {
      title: "Employment Partners",
      icon: Briefcase,
      color: "text-blue-500",
      bg: "bg-blue-50",
      items: [
        { name: "Second Chance Staffing", desc: "Immediate warehouse & logistics placement.", link: "#" },
        { name: "Local Union 402", desc: "Apprenticeship programs mapping.", link: "#" }
      ]
    },
    {
      title: "Housing Assistance",
      icon: Home,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      items: [
        { name: "County Shelter Intake", desc: "Emergency 24/7 housing coordinator.", link: "#" },
        { name: "Section 8 Fast-Track", desc: "Eligibility screening portal.", link: "#" }
      ]
    },
    {
      title: "Pro-Bono Legal",
      icon: Shield,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
      items: [
        { name: "Record Clearance Clinic", desc: "Tuesdays & Thursdays, 1PM - 4PM.", link: "#" }
      ]
    },
    {
      title: "Counseling & Support",
      icon: HeartHandshake,
      color: "text-rose-500",
      bg: "bg-rose-50",
      items: [
        { name: "Pathways Recovery", desc: "Substance abuse & mental health.", link: "#" },
        { name: "24/7 Crisis Hotline", desc: "Call 988 immediately if in crisis.", link: "#" }
      ]
    }
  ];

  return (
    <div className="p-6 pb-32">
      <div className="mb-8 pl-2">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Resource Board</h1>
        <p className="text-slate-500 mt-1 text-sm font-medium">Verified local support directories.</p>
      </div>

      <div className="space-y-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center mb-5 ml-1">
              <div className={`p-2.5 rounded-xl ${cat.bg} mr-3 shadow-inner`}>
                <cat.icon className={`w-5 h-5 ${cat.color}`} />
              </div>
              <h2 className="font-bold text-slate-800 text-lg">{cat.title}</h2>
            </div>
            
            <div className="space-y-3">
              {cat.items.map((item, i) => (
                <a key={i} href={item.link} className="block p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.01)] group">
                  <h3 className="font-bold text-slate-700 text-sm group-hover:text-blue-600 transition-colors">{item.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

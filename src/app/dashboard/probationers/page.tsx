import React from 'react'
import Link from 'next/link'
import { Search, Filter, ShieldAlert, CheckCircle, Clock } from 'lucide-react'

export default function CaseloadMatrix() {
  const probationers = [
    { id: 'PRB-8921', name: 'Marcus T.', offense: 'Non-Violent/Substance', risk: 'MEDIUM', status: 'VIOLATION', lastCheckIn: 'Missed (12m ago)' },
    { id: 'PRB-8922', name: 'Sarah L.', offense: 'White Collar', risk: 'LOW', status: 'COMPLIANT', lastCheckIn: 'Today, 08:00 AM' },
    { id: 'PRB-8923', name: 'David R.', offense: 'DUI', risk: 'HIGH', status: 'WARNING', lastCheckIn: 'Pending (Due in 1h)' },
    { id: 'PRB-8924', name: 'James W.', offense: 'Non-Violent/Property', risk: 'LOW', status: 'COMPLIANT', lastCheckIn: 'Yesterday, 09:15 AM' },
  ]

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Caseload Matrix</h1>
          <p className="text-slate-500 mt-1">Manage assigned individuals and compliance statuses.</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-md shadow-sm hover:bg-slate-50 transition-colors text-sm flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Probationer</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Offense Category</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Risk Level</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Last Check-In</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {probationers.map((person) => (
              <tr key={person.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-bold text-slate-900">{person.name}</div>
                      <div className="text-xs text-slate-500 font-mono">{person.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {person.offense}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-[10px] leading-5 font-bold rounded ${
                    person.risk === 'HIGH' ? 'bg-red-100 text-red-700' : 
                    person.risk === 'MEDIUM' ? 'bg-amber-100 text-amber-700' : 
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {person.risk}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {person.status === 'COMPLIANT' && <span className="flex items-center text-xs font-bold text-emerald-600"><CheckCircle className="w-4 h-4 mr-1.5" /> Compliant</span>}
                  {person.status === 'WARNING' && <span className="flex items-center text-xs font-bold text-amber-600"><Clock className="w-4 h-4 mr-1.5" /> Pending</span>}
                  {person.status === 'VIOLATION' && <span className="flex items-center text-xs font-bold text-red-600"><ShieldAlert className="w-4 h-4 mr-1.5" /> Violation</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium">
                  {person.lastCheckIn}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/dashboard/probationers/${person.id}`} className="text-blue-600 hover:text-blue-900 font-bold px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors">
                    View Profile
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

'use client'
import React from 'react'
import { FileDown } from 'lucide-react'

export default function PrintRecordButton() {
  return (
    <button 
      onClick={() => window.print()}
      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md font-bold text-sm shadow hover:bg-blue-700 transition-colors print:hidden"
    >
      <FileDown className="w-4 h-4 mr-2" />
      Export Audit Record PDF
    </button>
  )
}

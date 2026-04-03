import React from 'react';
import dynamic from 'next/dynamic';

const CheckInFlowCore = dynamic(() => import('@/components/CheckInFlowCore'), {
  ssr: false,
  loading: () => (
    <div className="p-6 h-full flex flex-col pt-32 items-center justify-start text-center">
       <div className="w-16 h-16 border-[6px] border-blue-100 border-t-blue-600 rounded-full animate-spin mb-6 drop-shadow-md"></div>
       <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Loading Secure Portal</h2>
       <p className="mt-2 text-sm text-slate-500 font-medium">Booting biometric engines safely...</p>
    </div>
  )
});

export default function CheckInPage() {
  return <CheckInFlowCore />;
}

"use client";

import React from 'react';
import NextDynamic from 'next/dynamic';

const LiveMap = NextDynamic(
  () => import('@/components/MapUI'),
  { ssr: false, loading: () => <div className="w-full h-80 bg-slate-100 animate-pulse rounded-lg flex items-center justify-center text-slate-400 font-medium">Booting Geospatial Engine...</div> }
);

export default function MapUIWrapper() {
  return <LiveMap />;
}

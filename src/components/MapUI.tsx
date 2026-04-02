"use client"
import React, { useEffect, useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: string;
}

export default function MapUI() {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    fetch('/api/locations')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setLocations(data);
        }
      })
      .catch(err => console.error("Could not load tracking points", err));
  }, []);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  // Default to USA center if no locations, else center on the first known log
  const centerLat = locations.length > 0 ? locations[0].lat : 38.0;
  const centerLng = locations.length > 0 ? locations[0].lng : -97.0;
  const zoomLevel = locations.length > 0 ? 14 : 4;

  if (!apiKey) return <div className="p-4 text-xs">Awaiting API Initialization...</div>;

  return (
    <div className="w-full h-80 rounded-lg overflow-hidden border border-slate-200 shadow-inner z-0">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultZoom={zoomLevel}
          defaultCenter={{ lat: centerLat, lng: centerLng }}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
          {locations.map((loc) => (
            <Marker key={loc.id} position={{ lat: loc.lat, lng: loc.lng }} />
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}

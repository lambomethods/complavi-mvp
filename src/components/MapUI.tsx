"use client"
import React, { useEffect, useState } from 'react';
import { APIProvider, Map, Marker, useMap } from '@vis.gl/react-google-maps';

function MapZones({ centerLat, centerLng }: { centerLat: number, centerLng: number }) {
  const map = useMap();
  useEffect(() => {
    if (!map || !window.google) return;

    // Inclusion Zone (Green) - County Boundaries / Geofence
    new window.google.maps.Circle({
      strokeColor: '#10B981',
      strokeOpacity: 0.7,
      strokeWeight: 2,
      fillColor: '#10B981',
      fillOpacity: 0.08,
      map,
      center: { lat: centerLat, lng: centerLng },
      radius: 3500, // 3.5 km approved boundary
    });

    // Exclusion Zone (Red) - Protective Stay Away Order
    new window.google.maps.Circle({
      strokeColor: '#EF4444',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#EF4444',
      fillOpacity: 0.15,
      map,
      center: { lat: centerLat + 0.015, lng: centerLng - 0.01 }, // Offset victim residence
      radius: 600, // 600 meter blackout zone
    });
  }, [map, centerLat, centerLng]);
  return null;
}

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
          mapId="DEMO_MAP_ID"
          defaultZoom={zoomLevel}
          defaultCenter={{ lat: centerLat, lng: centerLng }}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
          {locations.map((loc) => (
            <Marker key={loc.id} position={{ lat: loc.lat, lng: loc.lng }} />
          ))}
          <MapZones centerLat={centerLat} centerLng={centerLng} />
        </Map>
      </APIProvider>
    </div>
  );
}

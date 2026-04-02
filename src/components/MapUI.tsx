"use client"
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Next.js/Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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

  // Default to USA center if no locations, else center on the first known log
  const centerLat = locations.length > 0 ? locations[0].lat : 38.0;
  const centerLng = locations.length > 0 ? locations[0].lng : -97.0;
  const zoomLevel = locations.length > 0 ? 11 : 4;

  return (
    <div className="w-full h-80 rounded-lg overflow-hidden border border-slate-200 shadow-inner z-0">
      <MapContainer 
        center={[centerLat, centerLng]} 
        zoom={zoomLevel} 
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />
        {locations.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]}>
            <Popup>
              <strong className="text-slate-900">{loc.name}</strong><br/>
              <span className={loc.status === 'SUCCESS' ? 'text-emerald-600 font-bold text-xs' : 'text-red-600 font-bold text-xs'}>
                {loc.status === 'SUCCESS' ? 'Compliant' : 'Violation Warning'}
              </span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

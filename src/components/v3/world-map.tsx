'use client';
// components/WorldMap.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Define your locations here
// const locations = [
//   { id: 1, name: 'New York', position: [40.7128, -74.006] },
//   { id: 2, name: 'London', position: [51.5074, -0.1278] },
//   { id: 3, name: 'Tokyo', position: [35.6762, 139.6503] }
// ];

// Fix Leaflet marker icon issue
const MapComponent = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconRetinaUrl:
          'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        shadowUrl:
          'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
      });
      setMapLoaded(true);
    }
  }, []);

  if (!mapLoaded) return null;

  // Set map view with useMap hook
  const SetViewOnLoad = ({ center, zoom }: any) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
  };

  return (
    <div className="w-full h-screen">
      <MapContainer className="w-full h-[400px] !max-h-[400px]">
        <SetViewOnLoad center={[20, 0]} zoom={2} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* {locations.map(location => (
          <Marker key={location.id} position={location.position}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))} */}
      </MapContainer>
    </div>
  );
};

export default MapComponent;

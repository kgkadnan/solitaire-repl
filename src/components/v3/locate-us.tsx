import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon not showing
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

const LocateUs = ({ position }: any) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    return () => {
      setIsClient(false); // Clean up when the component unmounts
    };
  }, []);

  if (!isClient) {
    return null; // or a loading spinner
  }

  // const position: [number, number] = [19.067, 72.8508]; // Latitude and Longitude of KGK office in Borivali East, Mumbai

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{
        maxHeight: '650px',
        width: '650px',
        height: '650px',
        marginLeft: '-250px',
        borderRadius: '12px'
      }}
      scrollWheelZoom={false} // Disable zoom on scroll
      dragging={false} // Disable dragging
      touchZoom={false} // Disable pinch zoom
      doubleClickZoom={false} // Disable double-click zoom
      boxZoom={false} // Disable box zoom
      keyboard={false} // Disable keyboard interactions
      attributionControl={true} // Enable attribution control
    >
      {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      <Marker position={position}>{/* <Popup>{tooltip}</Popup> */}</Marker>
    </MapContainer>
  );
};

export default LocateUs;

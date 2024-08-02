// src/Globe.tsx

import React, { useRef, useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';

// Define the type for location data
interface ILocation {
  lat: number;
  lng: number;
  name: string;
}

// Define type for arc data
interface IArcData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
}

const locations: ILocation[] = [
  { lat: 51.505, lng: -0.09, name: 'London, UK' },
  { lat: 48.8566, lng: 2.3522, name: 'Paris, France' },
  { lat: 40.7128, lng: -74.006, name: 'New York, USA' }
  // Add more locations here
];

// Define arcs data between some locations
const arcs: IArcData[] = [
  {
    startLat: 51.505,
    startLng: -0.09,
    endLat: 48.8566,
    endLng: 2.3522,
    color: '#ff5722'
  },
  {
    startLat: 48.8566,
    startLng: 2.3522,
    endLat: 40.7128,
    endLng: -74.006,
    color: '#4caf50'
  },
  {
    startLat: 40.7128,
    startLng: -74.006,
    endLat: 51.505,
    endLng: -0.09,
    color: '#2196f3'
  }
];

const GlobeComponent: React.FC = () => {
  const [GlobeInstance, setGlobeInstance] = useState<any>(null);
  const globeEl = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('react-globe.gl').then(module => {
        setGlobeInstance(() => module.default);
      });
    }
  }, []);

  if (!GlobeInstance) return null; // or a loading spinner

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GlobeInstance
        ref={globeEl}
        width={window.innerWidth}
        height={window.innerHeight}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        pointsData={locations}
        pointLat={(d: any) => d.lat}
        pointLng={(d: any) => d.lng}
        pointLabel={(d: any) => `${d.name}\nLat: ${d.lat}\nLng: ${d.lng}`}
        pointColor={() => 'red'}
        pointAltitude={0.01}
        pointRadius={0.1}
        pointResolution={5}
        onPointClick={(d: any) => alert(`You clicked on ${d.name}`)}
        arcData={arcs}
        arcStartLat={(d: IArcData) => d.startLat}
        arcStartLng={(d: IArcData) => d.startLng}
        arcEndLat={(d: IArcData) => d.endLat}
        arcEndLng={(d: IArcData) => d.endLng}
        arcColor={(d: IArcData) => d.color}
        arcStroke={(_d: IArcData) => 2}
        arcOpacity={0.5}
        arcDashLength={0.5}
        animateIn={true}
        onGlobeReady={(_globe: any) => {
          // Automatically rotate the globe
          //   globe.controls().autoRotate = true;
          //   globe.controls().autoRotateSpeed = 0.5; // Adjust rotation speed here
        }}
      />
      {locations.map((location, index) => (
        <Tooltip
          key={index}
          id={`tooltip-${index}`}
          place="top"
          //   type="dark"
          //   effect="solid"
        >
          <span>{`${location.name}\nLat: ${location.lat}\nLng: ${location.lng}`}</span>
        </Tooltip>
      ))}
    </div>
  );
};

export default GlobeComponent;

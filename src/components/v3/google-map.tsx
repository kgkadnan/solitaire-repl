// MapComponent.js
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = ({ locations }: any) => {
  const mapStyles = { height: '400px', width: '100%' };
  const defaultCenter = { lat: 51.505, lng: -0.09 };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
        {locations.map((location: any, index: number) => (
          <Marker key={index} position={location.position} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;

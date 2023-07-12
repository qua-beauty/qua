import React from "react";
import GoogleMapReact from 'google-map-react';
import Shop from "./Shop";
import Me from "./Me";

export default function Map({ shops, me }) {
  const defaultProps = {
    center: {
      lat: me.lat,
      lng: me.lng
    },
    zoom: 11
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY }} // Replace with your Google Maps API key
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Me lat={me.lat} lng={me.lng} />

        {shops.map((shop) => (
          <Shop key={shop.id} lat={shop.lat} lng={shop.lng} shop={shop} />
        ))}
      </GoogleMapReact>
    </div>
  );
}

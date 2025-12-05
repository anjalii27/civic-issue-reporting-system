import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

// Default marker fix
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationSelector({ setLocation }) {
  useMapEvents({
    click(e) {
      setLocation({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });
  return null;
}

export default function IssueMap({ location, setLocation }) {
  return (
    <MapContainer
      center={[28.6139, 77.2090]} // Default = Delhi
      zoom={13}
      style={{ height: "300px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <LocationSelector setLocation={setLocation} />

      {location && (
        <Marker
          position={[location.lat, location.lng]}
          icon={markerIcon}
        />
      )}
    </MapContainer>
  );
}

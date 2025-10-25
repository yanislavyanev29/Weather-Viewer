import { useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";


const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function DraggableMarker({ pos, onChange }) {
  const [position, setPosition] = useState(pos);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onChange(e.latlng);
    },
  });

  return (
    <Marker
      icon={icon}
      draggable
      eventHandlers={{
        dragend: (e) => {
          const ll = e.target.getLatLng();
          setPosition(ll);
          onChange(ll);
        },
      }}
      position={position}
    />
  );
}
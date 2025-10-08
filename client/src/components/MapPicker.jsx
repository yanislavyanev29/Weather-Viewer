import { MapContainer,TileLayer,Marker, useMapEvents } from "react-leaflet";
import {useRef} from "react";
import leaflet from "leaflet";


function InteractionLayer({onChange}){

    useMapEvents({
        click(e){
            onChange([e.latlng.lat,e.latlng.lng]);
        },
    });
}

export default function MapPicker({ position, onPositionChange }) {
  const markerRef = useRef(null);

  return (
    <MapContainer
      center={position}
      zoom={11}
      scrollWheelZoom
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <InteractionLayer onChange={onPositionChange} />
      <Marker
        position={position}
        draggable
        ref={markerRef}
        eventHandlers={{
          dragend: () => {
            const marker = markerRef.current;
            if (!marker) return;
            const { lat, lng } = marker.getLatLng();
            onPositionChange([lat, lng]);
          },
        }}
        icon={new L.Icon.Default()}
      />
    </MapContainer>
  );
}
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { fetchWeather } from "../api";
import "./MapPicker.css"; 

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function DraggableMarker({ pos, onChange }) {
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

export default function MapPicker() {
  const [center, setCenter] = useState({ lat: 42.6977, lng: 23.3219 }); // София fallback
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [data, setData] = useState(null);

  // Get the geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (p) => setCenter({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => {} // default in Sofia
    );
  }, []);

  async function fetchFor(latlng) {
    setLoading(true);
    setErr("");
    setData(null);
    try {
      const w = await fetchWeather(latlng.lat, latlng.lng);
      setData(w);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFor(center);
  }, [center.lat, center.lng]);

  return (
    <div className="map-layout">
      {/* Left side of the map */}
      <div className="map-container">
        <MapContainer center={center} zoom={10} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <DraggableMarker pos={center} onChange={fetchFor} />
        </MapContainer>
      </div>

      {/* right side information */}
      <aside className="weather-panel">
        <h2>Current Weather</h2>
        {loading && <p className="status loading">Loading...</p>}
        {err && <p className="status error">{err}</p>}
        {data && (
          <div className="weather-data">
            <div className="temp">
              <img
                alt={data.description}
                src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
              />
              <span>{Math.round(data.temperature)}°C</span>
            </div>
            <p className="desc">{data.description}</p>
            <p>💧 Humidity: {data.humidity}%</p>
            <p>💨 Wind: {data.windSpeed} m/s</p>
            <p>🕓 {data.timezone}</p>
          </div>
        )}
        <small className="hint">Drag the marker or click anywhere on the map.</small>
      </aside>
    </div>
  );
}

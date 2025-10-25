import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fetchWeather } from "../api";
import "./MapPicker.css"; 
import DraggableMarker from "./DraggableMarker";
import useDebouncedCallback from "../hooks/useDebouncedCallback";




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
      const weather = await fetchWeather(latlng.lat, latlng.lng);

      setData(weather);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }
    const fetchForDebounced = useDebouncedCallback(fetchFor, 600)

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
          <DraggableMarker pos={center} onChange={fetchForDebounced} />
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

import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fetchWeather } from "../api";        // adjust path if needed
import DraggableMarker from "./DraggableMarker";
import useDebouncedCallback from "../hooks/useDebouncedCallback";
import WeatherPanel from "./WeatherPanel/WeatherPanel";
import LocateButton from "./LocateButton/LocateButton";
import "./MapPicker.css";

export default function MapPicker({ unit }) {
  const [center, setCenter] = useState({ lat: 42.6977, lng: 23.3219 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  // initial geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (p) => setCenter({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => { }
    );
  }, []);

  async function fetchFor(latlng) {
    setLoading(true); setError(""); setData(null);
    try { setData(await fetchWeather(latlng.lat, latlng.lng)); }
    catch (e) { setError(e.message || "Failed to load weather."); }
    finally { setLoading(false); }
  }

  const fetchForDebounced = useDebouncedCallback(fetchFor, 500);

  // load for initial/geo center (no debounce)
  useEffect(() => { fetchFor(center); }, [center.lat, center.lng]);

  const handleRetry = () => fetchFor(center);

  return (
    <div className="map-layout">
      <div className="map-container">
        <MapContainer center={center} zoom={10} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <DraggableMarker pos={center} onChange={fetchForDebounced} />
          <LocateButton onLocate={(ll) => { setCenter(ll); fetchFor(ll); }} />
        </MapContainer>
      </div>

      <WeatherPanel
        data={data}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        unit={unit}
      />
    </div>
  );
}

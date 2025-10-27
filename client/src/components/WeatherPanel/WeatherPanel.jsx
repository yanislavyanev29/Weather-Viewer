import { useMemo } from "react";
import "./WeatherPanel.css";
export default function WeatherPanel({ data, loading, error, onRetry, unit }) {
  const temp = useMemo(() => {
    if (!data) return null;
    const c = Math.round(data.temperature);
    return unit === "C" ? `${c}°C` : `${Math.round(c * 9/5 + 32)}°F`;
  }, [data, unit]);

  return (
    <aside className="weather-panel">
      <h2>Current Weather</h2>

      {loading && (
        <div className="wp-card skeleton">
          <div className="sk-line big" />
          <div className="sk-line" />
          <div className="sk-line" />
          <div className="sk-line short" />
        </div>
      )}

      {!loading && error && (
        <div className="wp-card error" role="alert">
          <p>⚠️ {error}</p>
          <button className="wp-btn" onClick={onRetry}>Retry</button>
        </div>
      )}

      {!loading && !error && data && (
        <div className="wp-card">
          <div className="wp-temp">
            <img
              alt={data.description}
              src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
              width="64" height="64" loading="lazy"
            />
            <span className="value">{temp}</span>
          </div>
          <p className="desc">{data.description}</p>
          <div className="wp-grid">
            <div className="wp-item">💧 Humidity <strong>{data.humidity}%</strong></div>
            <div className="wp-item">💨 Wind <strong>{data.windSpeed} m/s</strong></div>
            <div className="wp-item">🕓 Timezone <strong>{data.timezone}</strong></div>
          </div>
        </div>
      )}

      <small className="hint">Drag the marker or click anywhere on the map.</small>
    </aside>
  );
}

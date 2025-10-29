import React, { useEffect, useState } from "react";
import "./WeatherPanel.css";

function formatTemp(value, unit) {
  if (value == null) return "—";
  return unit === "F"
    ? `${Math.round(value * 9 / 5 + 32)}°F`
    : `${Math.round(value)}°C`;
}

// 🕒 функция за време в timezone
function getTimeInZone(tz) {
  try {
    const now = new Date();
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: tz || "UTC",
      hour: "2-digit",
      minute: "2-digit",
      weekday: "short",
      day: "2-digit",
      month: "short",
    }).format(now);
  } catch {
    return "—";
  }
}

export default function WeatherPanel({ data, loading, error, onRetry, unit = "C" }) {
  // 🕒 състояние за време
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    if (!data?.timezone) return;
    setLocalTime(getTimeInZone(data.timezone));

    // refresh every minute
    const id = setInterval(() => {
      setLocalTime(getTimeInZone(data.timezone));
    }, 60_000);

    return () => clearInterval(id);
  }, [data?.timezone]);

  return (
    <aside className="weather-panel" aria-live="polite">
      <div className="wp-header">
        <span className="wp-dot" aria-hidden="true" />
        <h2 className="wp-title">Current Weather</h2>
      </div>

      {/* Loading */}
      {loading && (
        <div className="wp-skeleton" role="status">
          <div className="sk-temp" />
          <div className="sk-line" />
          <div className="sk-grid"><span /><span /><span /></div>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="wp-error" role="alert">
          <p>{error}</p>
          {onRetry && <button className="wp-btn" onClick={onRetry}>Try again</button>}
        </div>
      )}

      
      {!loading && !error && data && (
        <div className="wp-body">
        
          <div className="wp-time">
            <span className="wp-clock">{localTime}</span>
          </div>

          <div className="wp-temp-row">
            {data.icon && (
              <img
                className="wp-icon"
                src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
                alt={data.description || "weather"}
                width="80"
                height="80"
              />
            )}
            <div className="wp-temp">{formatTemp(data.temperature, unit)}</div>
          </div>

          {data.description && (
            <div className="wp-desc">{data.description}</div>
          )}

          <div className="wp-details">
            <div className="wp-item" title="Humidity">
              <span>💧</span>
              <span>{data.humidity != null ? `${data.humidity}%` : "—"}</span>
            </div>
            <div className="wp-item" title="Wind">
              <span>🌬️</span>
              <span>{data.windSpeed != null ? `${data.windSpeed.toFixed(1)} m/s` : "—"}</span>
            </div>
          </div>

          <small className="wp-hint">
            Drag the marker or click anywhere on the map.
          </small>
        </div>
      )}
    </aside>
  );
}

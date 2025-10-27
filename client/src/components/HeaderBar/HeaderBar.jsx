import "./HeaderBar.css";

export default function HeaderBar({ unit, setUnit, dark, setDark }) {
  return (
    <header className="app-bar">
      <div className="brand">
        <span className="logo">🌤️</span>
        <h1>Weather Viewer</h1>
      </div>

      <div className="actions">
        <div className="unit-toggle" role="tablist" aria-label="Temperature unit">
          <button
            role="tab" aria-selected={unit === "C"}
            className={unit === "C" ? "active" : ""}
            onClick={() => setUnit("C")}
            title="Celsius"
          >°C</button>
          <button
            role="tab" aria-selected={unit === "F"}
            className={unit === "F" ? "active" : ""}
            onClick={() => setUnit("F")}
            title="Fahrenheit"
          >°F</button>
        </div>

        <label className="theme-toggle" title="Dark mode">
          <input type="checkbox" checked={dark} onChange={e => setDark(e.target.checked)} />
          <span className="slider" />
        </label>
      </div>
    </header>
  );
}

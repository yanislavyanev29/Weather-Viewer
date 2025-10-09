import React from "react";
import MapPicker from "./components/MapPicker.jsx";
import "./App.css";

/**
 * Main application component.
 * Contains the header, map section, and footer.
 */
export default function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        🌤️ Weather Viewer
      </header>

      <main className="app-main">
        <MapPicker />
      </main>

      <footer className="app-footer">
        Built with React + Leaflet + OpenWeather API
      </footer>
    </div>
  );
}
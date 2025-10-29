// App.jsx
import { useState ,useEffect} from "react";
import HeaderBar from "./components/HeaderBar/HeaderBar";
import MapPicker from "./components/MapPicker";
import "./App.css";

export default function App(){
  const [unit, setUnit] = useState("C");

  return (
    <div className="app-root">
      <HeaderBar
        title="Weather Viewer"
        unit={unit}
        onUnitChange={setUnit}
        onLocateClick={() => window.dispatchEvent(new CustomEvent("locate-me"))}
        onAboutClick={() => alert("Weather Viewer v1.0")}
      />
      <main className="app-main">
        <MapPicker unit={unit} />
      </main>
    </div>
  );
}
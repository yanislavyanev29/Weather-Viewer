// App.jsx
import { useState ,useEffect} from "react";
import HeaderBar from "./components/HeaderBar/HeaderBar";
import MapPicker from "./components/MapPicker";
import "./App.css";

export default function App() {
  const [unit, setUnit] = useState("C");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div id="app" className="app-root">
      <HeaderBar unit={unit} setUnit={setUnit} dark={dark} setDark={setDark} />
      <main className="app-main">
        <MapPicker unit={unit} />
      </main>
    </div>
  );
}

import { useMap } from "react-leaflet";
import "./LocateButton.css";
export default function LocateButton({ onLocate }) {
  const map = useMap();
  const handleLocate = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const ll = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        map.flyTo(ll, 12, { duration: 0.8 });
        onLocate?.(ll);
      },
      () => {}
    );
  };
  return <button className="locate-btn" onClick={handleLocate} title="Use my location">⌖</button>;
}

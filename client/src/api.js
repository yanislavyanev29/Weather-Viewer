const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

export async function fetchWeather(lat, lon, signal) {
  const res = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}`, { signal });
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    console.log("Sending Request");
    try {
      const data = await res.json();
      if (data?.error?.message) msg = data.error.message;
    } catch {
    throw  new Error(msg);
    }
  }
  return res.json();
}

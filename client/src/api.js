const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

function normCoord(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) throw new Error("Invalid coordinates.");
  return Number(n.toFixed(6)); // стабилен формат с точка
}

async function fetchJSON(url, opts) {
  const res = await fetch(url, opts);
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch {}
  if (!res.ok) {
    const msg = data?.message || data?.title || text || res.statusText || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

export async function fetchWeather(lat, lon, signal) {
  const la = normCoord(lat);
  const lo = normCoord(lon);
  const url = `${BASE_URL}/weather?lat=${la}&lon=${lo}`;
  return fetchJSON(url, { signal });
}

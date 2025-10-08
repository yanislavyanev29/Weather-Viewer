# 🌦 Weather Viewer – .NET 8 Web API

This project is a **.NET 8 Web API** that retrieves and returns the **current weather** based on geographic coordinates (latitude and longitude).  
It uses the **OpenWeather API** (One Call 3.0) to fetch real-time data and exposes a clean, validated REST endpoint.

---

## 🚀 Features
- **Endpoint:** `GET /weather?lat={lat}&lon={lon}`
- **Validation:** Returns HTTP `400` for invalid coordinates
- **Health check:** `GET /health` → returns `OK`
- **Error middleware:** Handles upstream (OpenWeather) or API errors
- **CORS enabled:** Allows frontend access (React client)
- **Runs on:** Port **5000**

---

## ⚙️ Configuration (`appsettings.json`)
```json
{
  "OpenWeather": {
    "BaseUrl": "https://api.openweathermap.org/",
    "ApiKey": "YOUR_API_KEY"
  },
  "Frontend": {
    "Origin": "http://localhost:5173"
  },
  "AllowedHosts": "*"
}

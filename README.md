# Weather Viewer 🌦️
Full-stack demo project built with **.NET 8 Web API** and **React (Leaflet)**, running on Linux Mint VM.

## Structure
- `api/` – backend (.NET Web API)
- `client/` – frontend (React + Leaflet)
- `docs/` – notes and setup instructions

## Goal
Visualize live weather data on an interactive map using the OpenWeather API.
🚀 Features

.NET 8 Web API

GET /weather?lat={lat}&lon={lon} endpoint

Returns simplified JSON: temperature, description, icon, humidity, wind speed, timezone

Includes validation, exception handling middleware, and CORS setup

Uses OpenWeather One Call 3.0 (or fallback Current Weather API)

React (Vite) Frontend

Interactive map using Leaflet + OpenStreetMap

On load: detects browser geolocation (fallback to Sofia, BG)

On marker drag/click: fetches new data from API

Displays weather info panel with temperature, description, and icons

## 🧩 Environment
Developed and tested on Linux Mint (VirtualBox) using:
- .NET 8.0 SDK  
- Node.js 20 (Vite)  
- Mozilla Firefox 

🧑‍💻 Developed by Yanislav Yanev  
📅 October 2025 | 🌐 BGO Software Assignment

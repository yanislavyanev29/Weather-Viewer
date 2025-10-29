import React, { useEffect, useState } from "react";
import "./HeaderBar.css";


 
export default function HeaderBar({
  title = "Weather Viewer",
  unit = "C",
  onUnitChange,
  onLocateClick,
  onAboutClick,
}) {
 

  const changeUnit = (next) => {
    if (next === unit) return;
    onUnitChange?.(next);
  };

  return (
    <header className="hb-root">
      <div className="hb-inner">
       
        <div className="hb-left">
          <div className="hb-logo" aria-hidden="true">☀️</div>
          <div className="hb-title">{title}</div>
        </div>

        {/* Controls */}
        <div className="hb-right">
          {/* Unit Switch */}
          <div className="hb-segment" role="group" aria-label="Temperature unit">
            <button
              className={`hb-seg ${unit === "C" ? "is-active" : ""}`}
              onClick={() => changeUnit("C")}
              aria-pressed={unit === "C"}
              title="Celsius"
            >
              °C
            </button>
            <button
              className={`hb-seg ${unit === "F" ? "is-active" : ""}`}
              onClick={() => changeUnit("F")}
              aria-pressed={unit === "F"}
              title="Fahrenheit"
            >
              °F
            </button>
          </div>

          
          {onLocateClick && (
            <button className="hb-icon-btn" onClick={onLocateClick} title="Locate me">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a1 1 0 0 1 1 1v1.062A7.002 7.002 0 0 1 19.938 11H21a1 1 0 1 1 0 2h-1.062A7.002 7.002 0 0 1 13 19.938V21a1 1 0 1 1-2 0v-1.062A7.002 7.002 0 0 1 4.062 13H3a1 1 0 1 1 0-2h1.062A7.002 7.002 0 0 1 11 4.062V3a1 1 0 0 1 1-1Zm0 6a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 8Z"/>
              </svg>
            </button>
          )}

        
          {onAboutClick && (
            <button className="hb-icon-btn" onClick={onAboutClick} title="About">
              ⓘ
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

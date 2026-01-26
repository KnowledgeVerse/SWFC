let map,
  geojsonLayer,
  phenomenaMarkersLayer,
  streetLayer,
  satelliteLayer,
  hybridLayer;
let districtTemps = {};
let isLayoutEditMode = false;
let zoomControl = null;
let currentLang = localStorage.getItem("lang") || "hi";
let tempMode = "current"; // 'current', 'max', 'min'

const uiTranslations = {
  hi: {
    title: "बिहार लाइव तापमान (Live Temperature)",
    refresh: "रिफ्रेश करें",
  },
  en: {
    title: "Bihar Live Temperature",
    refresh: "Refresh Data",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  initTempDisplay();

  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
});

function initTempDisplay() {
  let root = document.getElementById("liveRoot");

  // Inject CSS (Reusing live.js styles for consistency)
  const style = document.createElement("style");
  style.innerHTML = `
    html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; font-family: "Noto Sans Devanagari", sans-serif; background: #f4f7f6; }
    #liveRoot { width: 100%; height: 100%; display: flex; flex-direction: column; }
    .live-header { position: fixed; top: 0; left: 0; width: 100%; height: auto; min-height: 110px; background: rgba(255,255,255,0.65); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); z-index: 2000; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(0,0,0,0.1); border-bottom: 1px solid rgba(255,255,255,0.5); padding: 10px 0; }
    .header-content { text-align: center; text-shadow: 0 1px 1px rgba(255,255,255,0.8); margin-bottom: 8px; }
    .header-content h1 { margin: 0; color: #2c3e50; font-size: 1.8em; font-weight: 800; }
    #map { width: 100%; height: 100%; border-radius: 15px; z-index: 1; }
    .display-content-area { margin-top: 120px; flex: 1; width: 99%; max-width: 100%; margin-left: auto; margin-right: auto; height: calc(100% - 130px); position: relative; border-radius: 15px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1); background: white; border: 4px solid #2c3e50; }
    .live-controls-row { display: flex; gap: 8px; flex-wrap: nowrap; overflow-x: auto; justify-content: center; align-items: center; width: 100%; padding: 0 20px; white-space: nowrap; scrollbar-width: thin; }
    .live-controls-bottom { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 1000; display: flex; gap: 15px; align-items: center; background: rgba(255,255,255,0.95); padding: 10px 25px; border-radius: 30px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
    .control-btn { border: none; background: none; cursor: pointer; font-size: 1.4em; color: #2c3e50; transition: 0.2s; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; }
    .control-btn:hover { background: rgba(0,0,0,0.05); color: #667eea; transform: scale(1.1); }
    .layer-btn { padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; cursor: pointer; background: white; font-size: 0.9em; font-weight: 600; color: #555; }
    .layer-btn.active { background: #667eea; color: white; border-color: #667eea; }
    
    /* Tricolor Gradient Background */
    .tricolor-glow {
        background: linear-gradient(90deg, #FF9933, #FFFFFF, #138808, #FF9933);
        background-size: 200% auto;
        animation: tricolorMove 3s linear infinite;
        color: #000080;
        padding: 5px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        display: inline-block;
    }
    @keyframes tricolorMove {
        to { background-position: 200% center; }
    }
    
    .temp-block {
        background: transparent;
        border: none;
        box-shadow: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 0;
        min-width: auto;
    }
    .t-name { font-size: 11px; font-weight: 700; color: #2c3e50; text-shadow: 2px 2px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff; margin-bottom: 1px; font-family: 'Verdana', sans-serif; text-transform: uppercase; letter-spacing: 0.5px; }
    .t-val { font-size: 16px; font-weight: 900; margin: 0; text-shadow: 2px 2px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff; }
    .t-diff { font-size: 12px; font-weight: 800; margin-top: 0; text-shadow: 2px 2px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff; }
    
    /* Stats Panels */
    .stats-container { position: absolute; top: 90px; right: 10px; z-index: 1001; display: flex; flex-direction: column; gap: 8px; pointer-events: auto; }
    .stats-box { background: rgba(255,255,255,0.95); border-radius: 6px; padding: 8px 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.2); width: 210px; font-size: 12px; border-left: 5px solid #333; transition: transform 0.2s; }
    .stats-box:hover { transform: translateX(-5px); }
    .stats-header { font-weight: 800; border-bottom: 1px solid #ddd; margin-bottom: 5px; padding-bottom: 3px; text-transform: uppercase; font-size: 11px; color: #444; display: flex; justify-content: space-between; align-items: center; }
    .stats-row { display: flex; justify-content: space-between; margin-bottom: 3px; align-items: center; }
    .stats-label { color: #555; font-weight: 600; }
    .stats-val { font-weight: 800; font-size: 13px; color: #000; }
    
    /* Theme Colors for Stats */
    .theme-current { border-left-color: #f39c12; }
    .theme-max { border-left-color: #c0392b; }
    .theme-min { border-left-color: #3498db; }
  `;
  document.head.appendChild(style);

  root.innerHTML = `
    <header class="live-header">
        <img src="assets/logo.png" style="height: 70px; position: absolute; top: 20px; left: 20px;">
        <div class="header-content">
            <h1 id="liveTitle" class="tricolor-glow">बिहार लाइव तापमान (Live Temperature)</h1>
        </div>
        
        <div class="live-controls-row">
            <button class="layer-btn active" id="btnTempCurrent" onclick="setTempMode('current')" title="Current Temperature"><i class="fas fa-clock"></i> Current</button>
            <button class="layer-btn" id="btnTempMax" onclick="setTempMode('max')" title="Today's Max Temp"><i class="fas fa-temperature-high"></i> Max</button>
            <button class="layer-btn" id="btnTempMin" onclick="setTempMode('min')" title="Today's Min Temp"><i class="fas fa-temperature-low"></i> Min</button>
            <div style="width:1px; height:20px; background:#ccc; margin:0 5px;"></div>
            <button class="layer-btn" onclick="window.location.href='index.html'" title="Home"><i class="fas fa-home"></i></button>
            <button class="layer-btn active" onclick="setLayer('street')" id="btnStreet">Street</button>
            <button class="layer-btn" onclick="setLayer('satellite')" id="btnSat">Satellite</button>
            <button class="layer-btn" onclick="setLayer('hybrid')" id="btnHybrid">Hybrid</button>
            <button class="layer-btn" onclick="setLayer('clean')" id="btnClean">Clean</button>
            <button class="layer-btn" onclick="document.getElementById('mapBgInput').click()" title="Change Map Background"><i class="fas fa-palette"></i></button>
            <input type="color" id="mapBgInput" style="display:none" onchange="updateMapBackground(this.value)">
            <button class="layer-btn" onclick="toggleDarkMode()" id="btnDarkMode" title="Dark Mode"><i class="fas fa-moon"></i></button>
            <label class="layer-btn" style="display:flex; align-items:center; gap:5px; cursor:pointer;">
                <input type="checkbox" id="toggleLiveZoom" onchange="toggleMapZoom(this.checked)">
                Zoom
            </label>
            <button class="layer-btn" onclick="toggleLanguage()" id="btnLang" title="Language">${currentLang.toUpperCase()}</button>
        </div>
    </header>
        <div class="display-content-area">
            <div id="map"></div>
            
            <!-- Header inside Map Grid -->
            <div id="slideHeader" style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); z-index: 1000; text-align: center; font-size: 1.2em; font-weight: bold; color: #2c3e50; padding: 5px 20px; background: rgba(255,255,255,0.9); border: 2px solid #2c3e50; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.2); min-width: 300px; pointer-events: auto;">
                Fetching Data...
            </div>
            
            <div class="live-controls-bottom">
                <button class="control-btn" onclick="refreshData()" title="Refresh Data"><i class="fas fa-sync-alt"></i></button>
                <button class="control-btn" onclick="fitMapBounds()" title="Fit Map"><i class="fas fa-compress-arrows-alt"></i></button>
                <button class="control-btn" onclick="toggleFullScreen()" id="btnFullScreen" title="Full Screen"><i class="fas fa-expand"></i></button>
            </div>
        </div>
        <div id="tempLegend" class="info legend" style="position:absolute; bottom:20px; right:10px; z-index:1001; background:rgba(255,255,255,0.9); padding:10px; border-radius:8px; box-shadow:0 0 15px rgba(0,0,0,0.2); pointer-events:auto;"></div>
  `;

  initMap();
  updateLanguageUI();
  updateTempLegend();
}

function initMap() {
  map = L.map("map", {
    zoomControl: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    dragging: false,
    boxZoom: false,
    touchZoom: false,
  }).setView([25.6, 85.6], 7);

  streetLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    { maxZoom: 18, attribution: "© OpenStreetMap" },
  );

  satelliteLayer = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    { maxZoom: 18, attribution: "Tiles &copy; Esri" },
  );

  hybridLayer = L.tileLayer(
    "http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}",
    { attribution: "Google", maxZoom: 20 },
  );

  streetLayer.addTo(map);
  phenomenaMarkersLayer = L.layerGroup().addTo(map);

  // Add Static Overlays
  const mapContainer = map.getContainer();
  const overlaysContainer = L.DomUtil.create(
    "div",
    "map-overlays-container",
    mapContainer,
  );
  overlaysContainer.style.position = "absolute";
  overlaysContainer.style.top = "0";
  overlaysContainer.style.left = "0";
  overlaysContainer.style.width = "100%";
  overlaysContainer.style.height = "100%";
  overlaysContainer.style.pointerEvents = "none";
  overlaysContainer.style.zIndex = "1000";

  overlaysContainer.innerHTML = `
      <div id="overlayLeft" style="position:absolute; top:10px; left:10px; z-index:1001; display:flex; flex-direction:column; align-items:center; pointer-events:auto;">
          <img src="assets/logo.png" class="map-logo-left" style="height:70px; margin-left: 10px;">
          <div style="text-align:center; margin-top:5px; display:flex; flex-direction:column; align-items:center;">
              <div class="map-logo-text" style="margin-top:0; font-size:14px; background:rgba(255,255,255,0.8); padding:2px 5px; border-radius:4px; white-space:nowrap;">मौसम विज्ञान केंद्र, पटना</div>
              <div id="liveMapDateOverlay" style="margin-top:2px; font-weight:bold; color:#000; background:rgba(255,255,255,0.8); padding:2px 5px; border-radius:4px; font-size:12px; box-shadow: 0 1px 3px rgba(0,0,0,0.2); white-space:nowrap;"></div>
          </div>
      </div>
      <div id="overlayTopRight" style="position:absolute; top:10px; right:10px; z-index:1001; display:flex; gap:10px; align-items:center; pointer-events:auto;">
          <img src="assets/IMD_150_Year_Logo.png" style="height:70px;">
          <img src="assets/North_Arrow.png" style="height:60px;">
      </div>
      <div id="statsOverlay" class="stats-container"></div>
  `;

  updateDateOverlay();

  // Load Shapefile
  const basePath = "data/Bihar_Districts_Shapefile/Bihar";
  Promise.all([
    fetch(`${basePath}.shp`).then((r) => {
      if (!r.ok) throw new Error("SHP file not found");
      return r.arrayBuffer();
    }),
    fetch(`${basePath}.dbf`).then((r) => {
      if (!r.ok) throw new Error("DBF file not found");
      return r.arrayBuffer();
    }),
    fetch(`${basePath}.prj`).then((r) => {
      if (!r.ok) return null;
      return r.text();
    }),
  ])
    .then(([shpBuffer, dbfBuffer, prjStr]) => {
      const geojson = shp.combine([
        shp.parseShp(shpBuffer, prjStr || undefined),
        shp.parseDbf(dbfBuffer),
      ]);
      geojsonLayer = L.geoJSON(geojson, {
        style: {
          fillColor: "#ccc",
          weight: 2,
          opacity: 1,
          color: "#333",
          fillOpacity: 0.3,
        },
        onEachFeature: (feature, layer) => {
          // Tooltip removed to prevent overlap with custom marker
        },
      }).addTo(map);
      map.fitBounds(geojsonLayer.getBounds());

      // Fetch Temperatures after map load
      fetchTemperatures();
      // Auto-refresh every 15 minutes
      setInterval(fetchTemperatures, 900000);
    })
    .catch((err) => {
      console.error("Map loading failed:", err);
      alert("Map loading failed: " + err.message);
    });
}

function fetchTemperatures() {
  if (!geojsonLayer) return;

  const header = document.getElementById("slideHeader");
  if (header) header.innerText = "Updating Temperatures...";

  const requests = [];

  geojsonLayer.eachLayer((layer) => {
    const center = layer.getBounds().getCenter();
    const oid = String(layer.feature.properties.OBJECTID);

    // Open-Meteo API
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${center.lat}&longitude=${center.lng}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&past_days=1&timezone=auto`;

    requests.push(
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data.current_weather && data.daily) {
            // Index 0 is yesterday, Index 1 is today (due to past_days=1)
            const todayMax = data.daily.temperature_2m_max[1];
            const yestMax = data.daily.temperature_2m_max[0];
            const todayMin = data.daily.temperature_2m_min[1];
            const yestMin = data.daily.temperature_2m_min[0];

            districtTemps[oid] = {
              current: data.current_weather.temperature,
              max: todayMax,
              min: todayMin,
              maxDiff: todayMax - yestMax,
              minDiff: todayMin - yestMin,
            };
          }
        })
        .catch((e) => console.error(`Failed to fetch for ${oid}`, e)),
    );
  });

  Promise.all(requests).then(() => {
    updateMapStyle();

    // Calculate and Update Stats
    const currentVals = [];
    const maxVals = [];
    const minVals = [];
    Object.values(districtTemps).forEach((d) => {
      if (d.current !== undefined && d.current !== null)
        currentVals.push(d.current);
      if (d.max !== undefined && d.max !== null) maxVals.push(d.max);
      if (d.min !== undefined && d.min !== null) minVals.push(d.min);
    });
    updateStatsUI(currentVals, maxVals, minVals);

    if (header) header.innerText = "Live Temperature (Updated)";
    updateDateOverlay();
  });
}

function setTempMode(mode) {
  tempMode = mode;
  // Update buttons
  document.getElementById("btnTempCurrent").classList.remove("active");
  document.getElementById("btnTempMax").classList.remove("active");
  document.getElementById("btnTempMin").classList.remove("active");

  if (mode === "current")
    document.getElementById("btnTempCurrent").classList.add("active");
  if (mode === "max")
    document.getElementById("btnTempMax").classList.add("active");
  if (mode === "min")
    document.getElementById("btnTempMin").classList.add("active");

  updateMapStyle();
}
window.setTempMode = setTempMode;

function updateMapStyle() {
  if (!geojsonLayer) return;
  phenomenaMarkersLayer.clearLayers();

  // 1. Calculate Dynamic Range (Min/Max) for the current mode
  let minVal = Infinity;
  let maxVal = -Infinity;
  const validOids = [];

  geojsonLayer.eachLayer((layer) => {
    const oid = String(layer.feature.properties.OBJECTID);
    const data = districtTemps[oid];
    if (data) {
      const val =
        tempMode === "max"
          ? data.max
          : tempMode === "min"
            ? data.min
            : data.current;
      if (val < minVal) minVal = val;
      if (val > maxVal) maxVal = val;
      validOids.push(oid);
    }
  });

  // Handle case with no data
  if (minVal === Infinity) {
    minVal = 0;
    maxVal = 40;
  }
  // Ensure distinct min/max for gradient generation if all values are same
  if (minVal === maxVal) {
    minVal -= 1;
    maxVal += 1;
  }

  // Update Legend with new dynamic range
  updateTempLegend(minVal, maxVal);

  geojsonLayer.eachLayer((layer) => {
    const oid = String(layer.feature.properties.OBJECTID);
    const data = districtTemps[oid];

    if (data) {
      let displayVal,
        diffText,
        diffColor = "#000";

      if (tempMode === "max") {
        displayVal = data.max;
        const sign = data.maxDiff > 0 ? "+" : "";
        diffText = `Δ Yest: ${sign}${data.maxDiff.toFixed(1)}°`;
        if (data.maxDiff > 0)
          diffColor = "#0000ff"; // Blue
        else if (data.maxDiff < 0) diffColor = "#ff0000"; // Red
      } else if (tempMode === "min") {
        displayVal = data.min;
        const sign = data.minDiff > 0 ? "+" : "";
        diffText = `Δ Yest: ${sign}${data.minDiff.toFixed(1)}°`;
        if (data.minDiff > 0)
          diffColor = "#0000ff"; // Blue
        else if (data.minDiff < 0) diffColor = "#ff0000"; // Red
      } else {
        displayVal = data.current;
        // For current, show Diurnal Range (Max - Min) or H/L
        diffText = `H: ${data.max}° L: ${data.min}°`;
      }

      // Color coding
      const color = getColorForValue(displayVal, minVal, maxVal, tempMode);

      layer.setStyle({
        fillColor: color,
        fillOpacity: 0.7,
        color: "#333",
        weight: 2,
      });

      // Marker
      const center = layer.getBounds().getCenter();
      const districtName = layer.feature.properties.D_NAME;

      const iconHtml = `
        <div class="temp-block">
            <div class="t-name">${districtName}</div>
            <div class="t-val" style="color:#000">${displayVal}°C</div>
            <div class="t-diff" style="color:${diffColor}">${diffText}</div>
        </div>`;

      const icon = L.divIcon({
        html: iconHtml,
        className: "",
        iconSize: [100, 60],
        iconAnchor: [25, 40],
      });

      L.marker(center, { icon: icon }).addTo(phenomenaMarkersLayer);
    }
  });
}

function getColorForValue(val, min, max, mode) {
  // Define palettes
  const palettes = {
    current: ["#2ecc71", "#f1c40f", "#e67e22", "#e74c3c"], // Green -> Yellow -> Orange -> Red
    min: ["#3498db", "#00bcd4", "#2ecc71"], // Blue -> Cyan -> Green
    max: ["#f1c40f", "#e67e22", "#c0392b"], // Yellow -> Orange -> Dark Red
  };

  const colors = palettes[mode] || palettes.current;

  // Normalize value to 0-1 range
  let t = (val - min) / (max - min);
  t = Math.max(0, Math.min(1, t)); // Clamp

  // Map t to color segments
  const segments = colors.length - 1;
  const segmentLength = 1 / segments;
  const segmentIndex = Math.floor(t / segmentLength);

  // Handle exact max value case
  if (segmentIndex >= segments) return colors[colors.length - 1];

  const startColor = colors[segmentIndex];
  const endColor = colors[segmentIndex + 1];
  const localT = (t - segmentIndex * segmentLength) / segmentLength;

  return interpolateColor(startColor, endColor, localT);
}

function interpolateColor(c1, c2, factor) {
  // Simple hex interpolation
  const r1 = parseInt(c1.substring(1, 3), 16);
  const g1 = parseInt(c1.substring(3, 5), 16);
  const b1 = parseInt(c1.substring(5, 7), 16);

  const r2 = parseInt(c2.substring(1, 3), 16);
  const g2 = parseInt(c2.substring(3, 5), 16);
  const b2 = parseInt(c2.substring(5, 7), 16);

  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));

  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function updateTempLegend(min, max) {
  const div = document.getElementById("tempLegend");
  if (!div) return;

  const titles = {
    current: "Current Temperature (°C)",
    min: "Minimum Temperature (°C)",
    max: "Maximum Temperature (°C)",
  };

  const palettes = {
    current: "linear-gradient(to right, #2ecc71, #f1c40f, #e67e22, #e74c3c)",
    min: "linear-gradient(to right, #3498db, #00bcd4, #2ecc71)",
    max: "linear-gradient(to right, #f1c40f, #e67e22, #c0392b)",
  };

  const bg = palettes[tempMode] || palettes.current;
  const title = titles[tempMode] || titles.current;

  div.innerHTML = `
        <div style="font-weight:bold; margin-bottom:5px; font-size:12px; border-bottom:1px solid #ccc; padding-bottom:3px;">${title}</div>
        <div style="height:15px; width:100%; background:${bg}; border-radius:3px; margin-bottom:5px;"></div>
        <div style="display:flex; justify-content:space-between; font-size:11px; font-weight:bold; color:#333;">
            <span>${min !== undefined ? min.toFixed(1) : "Low"}</span>
            <span>${max !== undefined ? max.toFixed(1) : "High"}</span>
        </div>
    `;
}

function calculateStats(arr) {
  if (!arr || arr.length === 0) return { max: "N/A", min: "N/A", mean: "N/A" };
  let min = Infinity,
    max = -Infinity,
    sum = 0;
  arr.forEach((v) => {
    if (v < min) min = v;
    if (v > max) max = v;
    sum += v;
  });
  return {
    max: max.toFixed(1),
    min: min.toFixed(1),
    mean: (sum / arr.length).toFixed(1),
  };
}

function updateStatsUI(currentArr, maxArr, minArr) {
  const container = document.getElementById("statsOverlay");
  if (!container) return;

  const sCurr = calculateStats(currentArr);
  const sMax = calculateStats(maxArr);
  const sMin = calculateStats(minArr);

  const createPanel = (title, stats, themeClass, icon) => `
        <div class="stats-box ${themeClass}">
            <div class="stats-header">
                <span>${title}</span>
                <i class="fas ${icon}"></i>
            </div>
            <div class="stats-row">
                <span class="stats-label">Highest:</span>
                <span class="stats-val">${stats.max}°C</span>
            </div>
            <div class="stats-row">
                <span class="stats-label">Lowest:</span>
                <span class="stats-val">${stats.min}°C</span>
            </div>
            <div class="stats-row">
                <span class="stats-label">Average:</span>
                <span class="stats-val">${stats.mean}°C</span>
            </div>
        </div>
    `;

  container.innerHTML =
    createPanel("Current Temp", sCurr, "theme-current", "fa-clock") +
    createPanel("Maximum Temp", sMax, "theme-max", "fa-temperature-high") +
    createPanel("Minimum Temp", sMin, "theme-min", "fa-temperature-low");
}

function refreshData() {
  fetchTemperatures();
}
window.refreshData = refreshData;

function updateDateOverlay() {
  const el = document.getElementById("liveMapDateOverlay");
  if (el) {
    const now = new Date();
    el.innerText = now.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
}

function toggleMapZoom(enable) {
  if (enable) {
    map.dragging.enable();
    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.scrollWheelZoom.enable();
    map.boxZoom.enable();
    if (!zoomControl) {
      zoomControl = L.control.zoom({ position: "bottomright" }).addTo(map);
    }
  } else {
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    if (zoomControl) {
      map.removeControl(zoomControl);
      zoomControl = null;
    }
    fitMapBounds();
  }
}

function updateMapBackground(color) {
  const mapDiv = document.getElementById("map");
  if (mapDiv) mapDiv.style.background = color;
}
window.updateMapBackground = updateMapBackground;

function setLayer(type) {
  if (map.hasLayer(streetLayer)) map.removeLayer(streetLayer);
  if (map.hasLayer(satelliteLayer)) map.removeLayer(satelliteLayer);
  if (map.hasLayer(hybridLayer)) map.removeLayer(hybridLayer);

  document
    .querySelectorAll(".layer-btn")
    .forEach((b) => b.classList.remove("active"));

  if (type === "street") {
    map.addLayer(streetLayer);
    document.getElementById("btnStreet").classList.add("active");
  } else if (type === "satellite") {
    map.addLayer(satelliteLayer);
    document.getElementById("btnSat").classList.add("active");
  } else if (type === "hybrid") {
    map.addLayer(hybridLayer);
    document.getElementById("btnHybrid").classList.add("active");
  } else if (type === "clean") {
    // No layer added
    document.getElementById("btnClean").classList.add("active");
  }
}
window.setLayer = setLayer;

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDark);
}
window.toggleDarkMode = toggleDarkMode;

function toggleLanguage() {
  currentLang = currentLang === "hi" ? "en" : "hi";
  localStorage.setItem("lang", currentLang);
  updateLanguageUI();
}
window.toggleLanguage = toggleLanguage;

function updateLanguageUI() {
  const t = uiTranslations[currentLang];
  const titleEl = document.getElementById("liveTitle");
  const btn = document.getElementById("btnLang");
  if (titleEl) titleEl.innerText = t.title;
  if (btn) btn.innerText = currentLang.toUpperCase();
}

function fitMapBounds() {
  if (geojsonLayer) {
    map.fitBounds(geojsonLayer.getBounds());
  }
}
window.fitMapBounds = fitMapBounds;

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement
      .requestFullscreen()
      .catch((err) => console.error(err));
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
  }
}
window.toggleFullScreen = toggleFullScreen;

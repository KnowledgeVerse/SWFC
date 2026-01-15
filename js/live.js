// Configuration Data
const phenColors = {
  thunderstorm: "#ffc107",
  gustywind: "#17a2b8",
  heatwave: "#fd7e14",
  hailstorm: "#6f42c1",
  heavyrain: "#007bff",
  densefog: "#6c757d",
  coldday: "#20c997",
  warmnight: "#e83e8c",
};

const phenDefs = [
  { id: "thunderstorm", hindi: "मेघगर्जन/वज्रपात", icon: "fa-cloud-bolt" },
  { id: "gustywind", hindi: "तेज़ हवा", icon: "fa-wind" },
  { id: "heatwave", hindi: "लू (उष्ण लहर)", icon: "fa-fire" },
  { id: "hailstorm", hindi: "ओलावृष्टि", icon: "fa-cloud-meatball" },
  { id: "heavyrain", hindi: "भारी वर्षा", icon: "fa-cloud-showers-heavy" },
  { id: "densefog", hindi: "घना कोहरा", icon: "fa-smog" },
  { id: "coldday", hindi: "शीत दिवस", icon: "fa-snowflake" },
  { id: "warmnight", hindi: "गर्म रात्रि", icon: "fa-temperature-high" },
];

let currentSlide = 0;
let slideInterval;
let weatherData = [];
let map,
  geojsonLayer,
  phenomenaMarkersLayer,
  streetLayer,
  satelliteLayer,
  hybridLayer,
  radarLayer;
let districtPhenomenaMap = {};
let showFoothill = true;
let isPlaying = true;
let slideSpeed = 3000;

document.addEventListener("DOMContentLoaded", () => {
  initLiveDisplay();

  // Listen for updates from the main page
  window.addEventListener("storage", (e) => {
    if (e.key === "bihar_weather_data") {
      loadData();
    }
  });
});

function initLiveDisplay() {
  let root = document.getElementById("liveRoot");

  // Inject CSS
  const style = document.createElement("style");
  style.innerHTML = `
    html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; font-family: sans-serif; }
    #liveRoot { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; }
    .glass-main-panel { width: 95%; height: 95%; padding: 15px; }
    #map { width: 100%; height: 100%; border-radius: 15px; z-index: 1; }
    .display-content-area { flex: 1; width: 100%; position: relative; margin-top: 10px; border-radius: 15px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
    .live-controls-top { position: absolute; top: 10px; right: 10px; z-index: 1000; display: flex; gap: 5px; background: rgba(255,255,255,0.9); padding: 5px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
    .live-controls-bottom { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 1000; display: flex; gap: 15px; align-items: center; background: rgba(255,255,255,0.95); padding: 10px 25px; border-radius: 30px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
    .control-btn { border: none; background: none; cursor: pointer; font-size: 1.4em; color: #2c3e50; transition: 0.2s; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; }
    .control-btn:hover { background: rgba(0,0,0,0.05); color: #667eea; transform: scale(1.1); }
    .layer-btn { padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; cursor: pointer; background: white; font-size: 0.9em; font-weight: 600; color: #555; }
    .layer-btn.active { background: #667eea; color: white; border-color: #667eea; }
    .speed-control { display: flex; align-items: center; gap: 8px; font-size: 0.9em; font-weight: bold; color: #2c3e50; border-left: 1px solid #ccc; padding-left: 15px; margin-left: 5px; }
  `;
  document.head.appendChild(style);

  root.innerHTML = `
    <div class="glass-main-panel">
        <div class="glass-header-glow">
            <h1>बिहार मौसम पूर्वानुमान - लाइव पूर्वावलोकन</h1>
            <h2>Bihar Weather Forecast - Live Preview</h2>
        </div>
        <div id="slideHeader" style="text-align: center; font-size: 1.2em; font-weight: bold; color: #2c3e50; padding: 5px; background: rgba(255,255,255,0.5); border-radius: 50px; margin: 0 auto; width: fit-content; padding-left: 20px; padding-right: 20px;">Loading...</div>
        <div class="display-content-area">
            <div id="map"></div>
            
            <div class="live-controls-top">
                <button class="layer-btn active" onclick="setLayer('street')" id="btnStreet">Street</button>
                <button class="layer-btn" onclick="setLayer('satellite')" id="btnSat">Satellite</button>
                <button class="layer-btn" onclick="setLayer('hybrid')" id="btnHybrid">Hybrid</button>
                <button class="layer-btn" onclick="toggleRadar(this)" id="btnRadar" style="margin-left:5px; border-color:#e74c3c; color:#e74c3c;"><i class="fas fa-satellite-dish"></i> Radar</button>
            </div>

            <div class="live-controls-bottom">
                <button class="control-btn" onclick="prevSlide()" title="Previous"><i class="fas fa-step-backward"></i></button>
                <button class="control-btn" onclick="togglePlayPause()" id="btnPlayPause" title="Pause"><i class="fas fa-pause"></i></button>
                <button class="control-btn" onclick="nextSlide()" title="Next"><i class="fas fa-step-forward"></i></button>
                <button class="control-btn" onclick="toggleFullScreen()" id="btnFullScreen" title="Full Screen"><i class="fas fa-expand"></i></button>
                
                <div class="speed-control">
                    <i class="fas fa-tachometer-alt"></i>
                    <input type="range" min="1" max="10" value="3" step="0.5" oninput="updateSpeed(this.value)" style="width: 100px; cursor: pointer;">
                    <span id="speedDisplay">3s</span>
                </div>
            </div>
        </div>
    </div>
  `;

  // Add hover listeners to pause slideshow
  const mapDiv = document.getElementById("map");
  if (mapDiv) {
    mapDiv.addEventListener("mouseenter", () => {
      if (slideInterval) clearInterval(slideInterval);
    });
    mapDiv.addEventListener("mouseleave", () => {
      startSlideShow();
    });
  }

  initMap();
}

function initMap() {
  map = L.map("map", { zoomControl: true }).setView([25.6, 85.6], 7);

  streetLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    { maxZoom: 18, attribution: "© OpenStreetMap" }
  );

  satelliteLayer = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    { maxZoom: 18, attribution: "Tiles &copy; Esri" }
  );

  hybridLayer = L.tileLayer(
    "http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}",
    { attribution: "Google", maxZoom: 20 }
  );

  radarLayer = L.tileLayer.wms(
    "https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi",
    {
      layers: "nexrad-n0r-900913",
      format: "image/png",
      transparent: true,
      attribution: "Weather data © 2012 IEM Nexrad",
    }
  );

  streetLayer.addTo(map);

  phenomenaMarkersLayer = L.layerGroup().addTo(map);

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
        shp.parseShp(shpBuffer, prjStr),
        shp.parseDbf(dbfBuffer),
      ]);
      geojsonLayer = L.geoJSON(geojson, {
        style: (feature) => {
          const oid = parseInt(feature.properties.OBJECTID);
          // Use global subRegionDistricts from districts.js
          const isFoothill =
            showFoothill && subRegionDistricts.fh.includes(oid);
          return {
            fillColor: getDistrictRegionColor(oid),
            weight: 2,
            opacity: 1,
            color: "#333",
            dashArray: isFoothill ? "5, 5" : "",
            fillOpacity: isFoothill ? 0.5 : 0.2,
          };
        },
        onEachFeature: (feature, layer) => {
          if (feature.properties && feature.properties.D_NAME) {
            layer.bindTooltip(feature.properties.D_NAME, {
              permanent: true,
              direction: "center",
              className: "map-label",
            });
          }
        },
      }).addTo(map);
      map.fitBounds(geojsonLayer.getBounds());

      // Handle label visibility
      map.on("zoomend", () => {
        const pane = document.querySelector(".leaflet-tooltip-pane");
        if (pane)
          map.getZoom() < 8
            ? pane.classList.add("labels-hidden")
            : pane.classList.remove("labels-hidden");
      });

      // Load data after map is ready
      loadData();
    })
    .catch((err) => {
      console.error("Map loading failed:", err);
      alert("Map loading failed. Please check console.");
    });
}

function loadData() {
  const raw = localStorage.getItem("bihar_weather_data");
  if (raw) {
    try {
      weatherData = JSON.parse(raw);
    } catch (e) {
      weatherData = [];
    }
  }

  if (!Array.isArray(weatherData) || weatherData.length === 0) {
    weatherData = Array(7).fill({});
  } else {
    while (weatherData.length < 7) weatherData.push({});
  }

  startSlideShow();
}

function startSlideShow() {
  if (slideInterval) clearInterval(slideInterval);
  render();
  slideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % 7;
    render();
  }, slideSpeed);
}

function render() {
  updateSlideHeader(currentSlide + 1);

  const dayData = weatherData[currentSlide];
  districtPhenomenaMap = {};
  if (dayData) {
    for (const [id, list] of Object.entries(dayData)) {
      districtPhenomenaMap[id] = new Set(list);
    }
  }
  updateMapStyle();
}

function updateSlideHeader(dayNum) {
  const date = new Date();
  const targetDate = new Date();
  targetDate.setDate(date.getDate() + (dayNum - 1));

  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const todayStr = date
    .toLocaleDateString("en-IN", options)
    .replace(/\//g, "-");
  const targetDateStr = targetDate
    .toLocaleDateString("en-IN", options)
    .replace(/\//g, "-");

  const header = document.getElementById("slideHeader");
  if (header) {
    header.innerText = `Date: ${todayStr} | Day ${dayNum}: ${targetDateStr}`;
  }
}

function updateMapStyle() {
  if (!geojsonLayer) return;
  phenomenaMarkersLayer.clearLayers();

  geojsonLayer.eachLayer((layer) => {
    const oid = String(layer.feature.properties.OBJECTID);
    let phenomColor = null;
    let assignedPhenomenaList = [];

    if (districtPhenomenaMap[oid] && districtPhenomenaMap[oid].size > 0) {
      for (const pDef of phenDefs) {
        if (districtPhenomenaMap[oid].has(pDef.id)) {
          if (!phenomColor) phenomColor = phenColors[pDef.id];
          assignedPhenomenaList.push(pDef);
        }
      }
    }

    if (assignedPhenomenaList.length > 0) {
      const primary = assignedPhenomenaList[0];
      const iconHtml = `<div style="font-size: 32px; color: ${
        phenColors[primary.id]
      }; text-shadow: 0 0 3px #fff;"><i class="fas ${
        primary.icon
      } phenom-anim-${primary.id}"></i></div>`;
      const icon = L.divIcon({
        html: iconHtml,
        className: "map-phenom-marker",
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });
      const center = layer.getBounds().getCenter();
      L.marker(center, { icon: icon }).addTo(phenomenaMarkersLayer);
    }

    const isFoothill =
      showFoothill && subRegionDistricts.fh.includes(parseInt(oid));
    layer.setStyle({
      fillColor: phenomColor || getDistrictRegionColor(oid),
      fillOpacity: phenomColor ? 0.8 : 0.2,
      color: "#333",
      weight: 2,
      dashArray: !phenomColor && isFoothill ? "5, 5" : "",
    });
  });
}

function getDistrictRegionColor(id) {
  id = parseInt(id);
  // Use global subRegionDistricts from districts.js
  if (subRegionDistricts.nw.includes(id)) return "#00897b";
  if (subRegionDistricts.nc.includes(id)) return "#1976d2";
  if (subRegionDistricts.ne.includes(id)) return "#673ab7";
  if (subRegionDistricts.sw.includes(id)) return "#f44336";
  if (subRegionDistricts.sc.includes(id)) return "#fbc02d";
  if (subRegionDistricts.se.includes(id)) return "#795548";
  return "#3388ff";
}

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
  }
}
window.setLayer = setLayer;

function prevSlide() {
  currentSlide = (currentSlide - 1 + 7) % 7;
  render();
  resetInterval();
}
window.prevSlide = prevSlide;

function nextSlide() {
  currentSlide = (currentSlide + 1) % 7;
  render();
  resetInterval();
}
window.nextSlide = nextSlide;

function togglePlayPause() {
  isPlaying = !isPlaying;
  const btn = document.getElementById("btnPlayPause");
  if (isPlaying) {
    startSlideShow();
    btn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    clearInterval(slideInterval);
    btn.innerHTML = '<i class="fas fa-play"></i>';
  }
}
window.togglePlayPause = togglePlayPause;

function updateSpeed(val) {
  slideSpeed = val * 1000;
  document.getElementById("speedDisplay").innerText = val + "s";
  if (isPlaying) startSlideShow();
}
window.updateSpeed = updateSpeed;

function resetInterval() {
  if (isPlaying) startSlideShow();
}

function toggleRadar(btn) {
  if (map.hasLayer(radarLayer)) {
    map.removeLayer(radarLayer);
    btn.classList.remove("active");
  } else {
    map.addLayer(radarLayer);
    btn.classList.add("active");
  }
}
window.toggleRadar = toggleRadar;

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.error(
        `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
      );
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
window.toggleFullScreen = toggleFullScreen;

document.addEventListener("fullscreenchange", () => {
  const btn = document.getElementById("btnFullScreen");
  if (btn) {
    const isFull = !!document.fullscreenElement;
    btn.innerHTML = isFull
      ? '<i class="fas fa-compress"></i>'
      : '<i class="fas fa-expand"></i>';
    btn.title = isFull ? "Exit Full Screen" : "Full Screen";
  }
});

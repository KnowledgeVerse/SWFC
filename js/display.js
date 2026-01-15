// Configuration Data (Copied from main.js for standalone operation)
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

const weatherSounds = {
  thunderstorm: "assets/audio/thunderstorm.mp3",
  hailstorm: "assets/audio/hailstorm.mp3",
  heavyrain: "assets/audio/heavyrain.mp3",
  gustywind: "assets/audio/gustywind.mp3",
};

let currentSlide = 0;
let slideInterval;
let weatherData = [];
let map, geojsonLayer, phenomenaMarkersLayer, tileLayer, satelliteLayer;
let districtPhenomenaMap = {};
let currentAudio = new Audio();
currentAudio.loop = true;
let isSoundEnabled = false;

document.addEventListener("DOMContentLoaded", () => {
  initDisplay();
  loadData();

  // Listen for updates from the main page
  window.addEventListener("storage", (e) => {
    if (e.key === "bihar_weather_data") {
      loadData();
    }
  });
});

function initDisplay() {
  let root = document.getElementById("displayRoot");
  if (!root) {
    root = document.createElement("div");
    root.id = "displayRoot";
    document.body.appendChild(root);
  }

  // Inject CSS to ensure full height and visibility
  const style = document.createElement("style");
  style.innerHTML = `
    html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #eef2f3; font-family: sans-serif; }
    #displayRoot { width: 100%; height: 100%; position: relative; }
  `;
  document.head.appendChild(style);

  root.innerHTML = `
        <div class="header-info" style="position:fixed; top:20px; left:20px; z-index:2000; background: rgba(255,255,255,0.9); padding: 10px 20px; border-radius: 50px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
             <div id="dispDateTime" class="info-box" style="font-size: 1.2em; font-weight: bold; color: #2c3e50;"></div>
        </div>
        <div style="position:fixed; top:80px; left:20px; z-index:2000; background: rgba(255,255,255,0.9); padding: 10px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); display:flex; flex-direction:column; gap:5px;">
             <label style="display:flex; align-items:center; gap:5px; cursor:pointer; font-weight:bold; color:#2c3e50;">
                <input type="checkbox" id="dispStreetView" checked onchange="toggleDisplayTiles(this.checked)">
                Street View
             </label>
             <label style="display:flex; align-items:center; gap:5px; cursor:pointer; font-weight:bold; color:#2c3e50;">
                <input type="checkbox" id="dispSatelliteView" onchange="toggleDisplaySatellite(this.checked)">
                Satellite View
             </label>
        </div>
        <div style="position:fixed; top:20px; right:20px; z-index:2000; display: flex; gap: 10px;">
            <button onclick="toggleSound()" title="Toggle Sound" style="background: rgba(255,255,255,0.9); border: none; padding: 10px; border-radius: 50%; cursor: pointer; box-shadow: 0 5px 15px rgba(0,0,0,0.1); width: 45px; height: 45px; font-size: 1.2em; color: #2c3e50; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                <i class="fas fa-volume-mute" id="soundIcon"></i>
            </button>
            <button onclick="togglePlayPause()" title="Pause Slideshow" style="background: rgba(255,255,255,0.9); border: none; padding: 10px; border-radius: 50%; cursor: pointer; box-shadow: 0 5px 15px rgba(0,0,0,0.1); width: 45px; height: 45px; font-size: 1.2em; color: #2c3e50; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                <i class="fas fa-pause" id="playPauseIcon"></i>
            </button>
            <button onclick="toggleFullScreen()" title="Toggle Fullscreen" style="background: rgba(255,255,255,0.9); border: none; padding: 10px; border-radius: 50%; cursor: pointer; box-shadow: 0 5px 15px rgba(0,0,0,0.1); width: 45px; height: 45px; font-size: 1.2em; color: #2c3e50; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                <i class="fas fa-expand" id="fsIcon"></i>
            </button>
        </div>
        <div id="map" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;"></div>
        <div id="contentArea" class="display-container slide-view" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10; pointer-events: none; display: flex; align-items: center; justify-content: center;"></div>
    `;
  updateTime();
  initMap();
  setInterval(updateTime, 1000);
}

function updateTime() {
  const now = new Date();
  document.getElementById("dispDateTime").innerText = now.toLocaleString(
    "hi-IN",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }
  );
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

  // Ensure we have 7 days of data (even if empty) to run the slideshow
  if (!Array.isArray(weatherData) || weatherData.length === 0) {
    weatherData = Array(7).fill({});
  } else {
    // Pad with empty objects if less than 7 days
    while (weatherData.length < 7) weatherData.push({});
  }

  const ca = document.getElementById("contentArea");
  if (ca) ca.innerHTML = "";
  startSlideShow();
}

function startSlideShow() {
  if (slideInterval) clearInterval(slideInterval);
  render(); // Render immediately
  slideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % 7;
    render();
  }, 5000); // Change slide every 5 seconds
}

function render() {
  if (!weatherData || weatherData.length === 0) {
    return;
  }

  const mapDiv = document.getElementById("map");
  const header = document.getElementById("slideHeader");

  if (mapDiv) {
    mapDiv.style.transition = "opacity 0.5s ease-in-out";
    mapDiv.style.opacity = "0";
  }
  if (header) {
    header.style.transition = "opacity 0.5s ease-in-out";
    header.style.opacity = "0";
  }

  setTimeout(() => {
    const dayData = weatherData[currentSlide];
    const dayPhenomena = new Set();

    // Update map data
    districtPhenomenaMap = {};
    if (dayData) {
      for (const [id, list] of Object.entries(dayData)) {
        districtPhenomenaMap[id] = new Set(list);
        list.forEach((p) => dayPhenomena.add(p));
      }
    }

    updateMapStyle();
    playWeatherSound(dayPhenomena);
    updateSlideHeader(currentSlide + 1);

    if (mapDiv) mapDiv.style.opacity = "1";
    const newHeader = document.getElementById("slideHeader");
    if (newHeader) {
      newHeader.style.transition = "opacity 0.5s ease-in-out";
      newHeader.style.opacity = "1";
    }
  }, 500);
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

  let header = document.getElementById("slideHeader");
  if (!header) {
    header = document.createElement("div");
    header.id = "slideHeader";
    header.style.position = "absolute";
    header.style.top = "20px";
    header.style.left = "50%";
    header.style.transform = "translateX(-50%)";
    header.style.zIndex = "1000";
    header.style.background = "rgba(255,255,255,0.9)";
    header.style.padding = "10px 30px";
    header.style.borderRadius = "30px";
    header.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
    header.style.fontSize = "1.5em";
    header.style.fontWeight = "bold";
    header.style.color = "#2c3e50";
    const container = document.getElementById("contentArea");
    if (container) container.appendChild(header);
  }
  header.innerText = `Date: ${todayStr} | Day ${dayNum}: ${targetDateStr}`;
}

function initMap() {
  map = L.map("map", { zoomControl: false }).setView([25.6, 85.6], 7);

  tileLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    { maxZoom: 18, attribution: "© OpenStreetMap" }
  );

  satelliteLayer = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    { maxZoom: 18, attribution: "Tiles &copy; Esri" }
  );

  tileLayer.addTo(map);
  phenomenaMarkersLayer = L.layerGroup().addTo(map);

  // Load Shapefile
  const basePath = "data/Bihar_Districts_Shapefile/Bihar";
  Promise.all([
    fetch(`${basePath}.shp`).then((r) => r.arrayBuffer()),
    fetch(`${basePath}.dbf`).then((r) => r.arrayBuffer()),
  ]).then(([shpBuffer, dbfBuffer]) => {
    const geojson = shp.combine([
      shp.parseShp(shpBuffer),
      shp.parseDbf(dbfBuffer),
    ]);
    geojsonLayer = L.geoJSON(geojson, {
      style: {
        fillColor: "#3388ff",
        weight: 2,
        opacity: 1,
        color: "#333",
        fillOpacity: 0.2,
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
  });
}

function toggleDisplayTiles(show) {
  if (show) {
    if (map.hasLayer(satelliteLayer)) map.removeLayer(satelliteLayer);
    if (!map.hasLayer(tileLayer)) map.addLayer(tileLayer);
    document.getElementById("dispSatelliteView").checked = false;
  } else {
    if (map.hasLayer(tileLayer)) map.removeLayer(tileLayer);
  }
}

function toggleDisplaySatellite(show) {
  if (show) {
    if (map.hasLayer(tileLayer)) map.removeLayer(tileLayer);
    if (!map.hasLayer(satelliteLayer)) map.addLayer(satelliteLayer);
    document.getElementById("dispStreetView").checked = false;
  } else {
    if (map.hasLayer(satelliteLayer)) map.removeLayer(satelliteLayer);
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
      }; text-shadow: 0 0 3px #fff;">
                            <i class="fas ${primary.icon}"></i>
                          </div>`;
      const icon = L.divIcon({
        html: iconHtml,
        className: "map-phenom-marker",
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });
      const center = layer.getBounds().getCenter();
      L.marker(center, { icon: icon }).addTo(phenomenaMarkersLayer);
    }

    if (phenomColor) {
      layer.setStyle({
        fillColor: phenomColor,
        fillOpacity: 0.8,
        color: "#333",
        weight: 2,
      });
    } else {
      layer.setStyle({
        fillColor: getDistrictRegionColor(oid),
        fillOpacity: 0.2,
        color: "#333",
        weight: 2,
      });
    }
  });
}

function getDistrictRegionColor(id) {
  id = parseInt(id);
  // Simplified region colors for display
  const subRegionDistricts = {
    nw: [38, 11, 13, 35, 31],
    nc: [23, 37, 34, 33, 10, 30, 21],
    ne: [36, 1, 18, 27, 16, 20, 29],
    sw: [28, 6, 8, 9, 2, 3],
    sc: [26, 24, 14, 25, 12, 19, 32, 5],
    se: [15, 22, 4, 17, 7],
  };
  if (subRegionDistricts.nw.includes(id)) return "#00897b";
  if (subRegionDistricts.nc.includes(id)) return "#1976d2";
  if (subRegionDistricts.ne.includes(id)) return "#673ab7";
  if (subRegionDistricts.sw.includes(id)) return "#f44336";
  if (subRegionDistricts.sc.includes(id)) return "#fbc02d";
  if (subRegionDistricts.se.includes(id)) return "#795548";
  return "#3388ff";
}

function getDistrictName(id) {
  // districtsData is available from districts.js
  const d = districtsData.find((x) => x.id === parseInt(id));
  return d ? d.name : id;
}

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

document.addEventListener("fullscreenchange", () => {
  const icon = document.getElementById("fsIcon");
  if (icon) {
    if (document.fullscreenElement) {
      icon.classList.remove("fa-expand");
      icon.classList.add("fa-compress");
    } else {
      icon.classList.remove("fa-compress");
      icon.classList.add("fa-expand");
    }
  }
});

window.toggleFullScreen = toggleFullScreen;

function togglePlayPause() {
  const icon = document.getElementById("playPauseIcon");
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");
    icon.parentElement.title = "Play Slideshow";
  } else {
    startSlideShow();
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
    icon.parentElement.title = "Pause Slideshow";
  }
}
window.togglePlayPause = togglePlayPause;

function toggleSound() {
  isSoundEnabled = !isSoundEnabled;
  const icon = document.getElementById("soundIcon");
  if (isSoundEnabled) {
    icon.classList.remove("fa-volume-mute");
    icon.classList.add("fa-volume-up");
    render(); // Re-render to trigger sound immediately
  } else {
    icon.classList.remove("fa-volume-up");
    icon.classList.add("fa-volume-mute");
    currentAudio.pause();
  }
}
window.toggleSound = toggleSound;

function playWeatherSound(dayPhenomena) {
  if (!isSoundEnabled) {
    if (!currentAudio.paused) currentAudio.pause();
    return;
  }

  const priorities = ["thunderstorm", "hailstorm", "heavyrain", "gustywind"];
  let soundToPlay = null;

  for (const p of priorities) {
    if (dayPhenomena.has(p)) {
      soundToPlay = weatherSounds[p];
      break;
    }
  }

  if (soundToPlay) {
    if (!currentAudio.src.includes(soundToPlay)) {
      currentAudio.src = soundToPlay;
      currentAudio.play().catch((e) => console.warn("Audio play failed:", e));
    } else if (currentAudio.paused) {
      currentAudio.play().catch((e) => console.warn("Audio play failed:", e));
    }
  } else {
    currentAudio.pause();
  }
}

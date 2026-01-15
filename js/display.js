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

let currentSlide = 0;
let slideInterval;
let weatherData = [];
let map, geojsonLayer, phenomenaMarkersLayer;
let districtPhenomenaMap = {};

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
  const root = document.getElementById("displayRoot");
  root.innerHTML = `
        <div class="header-info" style="position:fixed; top:20px; left:20px; z-index:2000; background: rgba(255,255,255,0.9); padding: 10px 20px; border-radius: 50px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
             <div id="dispDateTime" class="info-box" style="font-size: 1.2em; font-weight: bold; color: #2c3e50;"></div>
        </div>
        <div style="position:fixed; top:20px; right:20px; z-index:2000; display: flex; gap: 10px;">
            <button onclick="togglePlayPause()" title="Pause Slideshow" style="background: rgba(255,255,255,0.9); border: none; padding: 10px; border-radius: 50%; cursor: pointer; box-shadow: 0 5px 15px rgba(0,0,0,0.1); width: 45px; height: 45px; font-size: 1.2em; color: #2c3e50; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                <i class="fas fa-pause" id="playPauseIcon"></i>
            </button>
            <button onclick="toggleFullScreen()" title="Toggle Fullscreen" style="background: rgba(255,255,255,0.9); border: none; padding: 10px; border-radius: 50%; cursor: pointer; box-shadow: 0 5px 15px rgba(0,0,0,0.1); width: 45px; height: 45px; font-size: 1.2em; color: #2c3e50; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                <i class="fas fa-expand" id="fsIcon"></i>
            </button>
        </div>
        <div id="contentArea" class="display-container slide-view" style="height: 100vh; display: flex; align-items: center; justify-content: center;"></div>
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
    weatherData = JSON.parse(raw);
    startSlideShow();
  } else {
    document.getElementById("contentArea").innerHTML =
      "<h2 style='color:white; text-shadow: 0 2px 4px rgba(0,0,0,0.5);'>Waiting for forecast data...</h2>";
  }
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

    // Update map data
    districtPhenomenaMap = {};
    if (dayData) {
      for (const [id, list] of Object.entries(dayData)) {
        districtPhenomenaMap[id] = new Set(list);
      }
    }

    updateMapStyle();
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
  date.setDate(date.getDate() + (dayNum - 1));
  const dateStr = date.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
  header.innerText = `Day ${dayNum} - ${dateStr}`;
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

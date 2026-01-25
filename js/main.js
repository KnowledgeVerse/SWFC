// ---------- Intensity lines (Scripts.xlsx order) ----------
const intensityLines = {
  thunderstorm: [
    "हल्के से मध्यम दर्जे की मेघ गर्जन तथा वज्रपात के साथ वर्षा जारी रहने की संभावना है।",
    "मध्यम दर्जे की मेघ गर्जन, वज्रपात के साथ वर्षा होने की प्रबल संभावना है।",
    "हल्के से मध्यम दर्जे की मेघ गर्जन, वज्रपात, (हवा की गति 30-40 कि. मी. प्रति घंटे तक) के साथ हल्की वर्षा होने की संभावना है।",
    "मध्यम दर्जे की मेघ गर्जन, वज्रपात,हवा (हवा की गति 40-50 कि. मी. प्रति घंटे तक) के साथ वर्षा होने की प्रबल संभावना है।",
    "तीव्र दर्जे की मेघ गर्जन, वज्रपात तथा भारी वर्षा के साथ तेज हवा (हवा की गति 50-60 कि. मी. प्रति घंटे तक) की प्रबल संभावना है।",
    "मेघ गर्जन, वज्रपात, ओलावृष्टि एवं  हवा (हवा की गति 40-50 कि. मी. प्रति घंटे तक) के साथ वर्षा होने की प्रबल संभावना है।",
  ],
  gustywind: [
    "तेज़ हवा (हवा की गति 30-40 कि. मी. प्रति घंटे तक) रहने की संभावना है।",
    "तेज़ हवा (हवा की गति 40-50 कि. मी. प्रति घंटे तक) रहने की संभावना है।",
    "तेज़ हवा (हवा की गति 50-60 कि. मी. प्रति घंटे तक) रहने की संभावना है।",
  ],
  heatwave: [
    "लू (उष्ण लहर ) की संभावना है ।",
    "उष्ण दिवस होने की संभावना है।",
    "अत्यधिक भीषण उष्ण लहर (लू) की संभावना है।",
  ],
  hailstorm: ["ओलावृष्टि की संभावना है।"],
  heavyrain: ["भारी वर्षा होने की संभावना है।"],
  densefog: [
    "घना कोहरा / कुहासा छाए रहने की प्रबल संभावना है।",
    "घना से बहुत घना कोहरा / कुहासा छाए रहने की प्रबल संभावना है।",
  ],
  coldday: ["शीत दिवस होने की संभावना है।"],
  warmnight: ["गर्म रात्रि की संभावना है ।"],
};

const intensityLinesEn = {
  thunderstorm: [
    "Light to moderate thunderstorm & lightning with rain likely to continue.",
    "Moderate thunderstorm & lightning with rain very likely.",
    "Light to moderate thunderstorm, lightning (wind 30-40 kmph) with light rain likely.",
    "Moderate thunderstorm, lightning, wind (40-50 kmph) with rain very likely.",
    "Intense thunderstorm, lightning & heavy rain with strong wind (50-60 kmph) very likely.",
    "Thunderstorm, lightning, hail & wind (40-50 kmph) with rain very likely.",
  ],
  gustywind: [
    "Gusty wind (speed 30-40 kmph) likely.",
    "Gusty wind (speed 40-50 kmph) likely.",
    "Gusty wind (speed 50-60 kmph) likely.",
  ],
  heatwave: [
    "Heat wave likely.",
    "Hot day likely.",
    "Severe heat wave likely.",
  ],
  hailstorm: ["Hailstorm likely."],
  heavyrain: ["Heavy rainfall likely."],
  densefog: ["Dense fog likely.", "Very dense fog likely."],
  coldday: ["Cold day likely."],
  warmnight: ["Warm night likely."],
};

// ---------- Phenomena colour-map ----------
const phenColors = {
  thunderstorm: "#ffc107", // Amber
  gustywind: "#17a2b8", // Info
  heatwave: "#fd7e14", // Orange
  hailstorm: "#6f42c1", // Indigo
  heavyrain: "#007bff", // Blue
  densefog: "#6c757d", // Grey
  coldday: "#20c997", // Teal
  warmnight: "#e83e8c", // Pink
};

// ---------- Audio Assets ----------
const weatherSounds = {
  thunderstorm: "assets/audio/thunderstorm.mp3",
  gustywind: "assets/audio/gustywind.mp3",
  heatwave: "assets/audio/heatwave.mp3",
  hailstorm: "assets/audio/hailstorm.mp3",
  heavyrain: "assets/audio/heavyrain.mp3",
  densefog: "assets/audio/densefog.mp3",
  coldday: "assets/audio/coldday.mp3",
  warmnight: "assets/audio/warmnight.mp3",
};

// ---------- Dropdown Options (Custom Colors) ----------
const forecastDropdownOptions = [
  { value: 0, text: "DRY – शुष्क", color: null },
  {
    value: 1,
    text: "ISOL (ONE OR TWO PLACES) – एक दो स्थानों पर",
    color: "rgb(51, 204, 51)",
  },
  {
    value: 2,
    text: "SCATTERED (FEW PLACES) – कुछ स्थानों पर",
    color: "rgb(0, 153, 0)",
  },
  {
    value: 3,
    text: "FAIRLY WIDESPREAD (MANY PLACES) – अनेक स्थानों पर",
    color: "rgb(51, 204, 255)",
  },
  {
    value: 4,
    text: "WIDESPREAD (MOST PLACES) – अधिकांश स्थानों पर",
    color: "rgb(0, 102, 255)",
  },
];

const warningDropdownOptions = [
  { value: 0, text: "NO WARNING – कोई चेतावनी नहीं", color: "rgb(0, 153, 0)" },
  { value: 1, text: "YELLOW – पीला", color: "rgb(255, 255, 0)" },
  { value: 2, text: "ORANGE – नारंगी", color: "rgb(255, 192, 0)" },
  { value: 3, text: "RED – लाल", color: "rgb(255, 0, 0)" },
];

// Combine options for the Color Selection dropdown
const combinedColorOptions = [
  { value: "default", text: "Select Color...", color: null },
  ...forecastDropdownOptions
    .filter((o) => o.value !== 0)
    .map((o) => ({ ...o, text: "Forecast: " + o.text })),
  ...warningDropdownOptions.map((o) => ({ ...o, text: "Warning: " + o.text })),
];

// ---------- Legend Static Items ----------
const forecastLegendItems = [
  { color: "transparent", text: "DRY<br>शुष्क", border: "1px solid #999" },
  {
    color: "rgb(51, 204, 51)",
    text: "ISOL (ONE OR TWO PLACES)<br>एक दो स्थानों पर",
  },
  { color: "rgb(0, 153, 0)", text: "SCATTERED (FEW PLACES)<br>कुछ स्थानों पर" },
  {
    color: "rgb(51, 204, 255)",
    text: "FAIRLY WIDESPREAD (MANY PLACES)<br>अनेक स्थानों पर",
  },
  {
    color: "rgb(0, 102, 255)",
    text: "WIDESPREAD (MOST PLACES)<br>अधिकांश स्थानों पर",
  },
];

const warningLegendItems = [
  {
    color: "rgb(255, 0, 0)",
    text: "RED (लाल) – WARNING<br>(Take Action / तुरंत कार्रवाई करें)",
  },
  {
    color: "rgb(255, 192, 0)",
    text: "ORANGE (नारंगी) – ALERT<br>(Be Prepared / सतर्क रहें)",
  },
  {
    color: "rgb(255, 255, 0)",
    text: "YELLOW (पीला) – WATCH<br>(Be Updated / अपडेट रहें)",
  },
  {
    color: "rgb(0, 153, 0)",
    text: "GREEN (हरा) – NO WARNING<br>(No Action / कोई चेतावनी नहीं)",
  },
];

// ---------- Globals ----------
let selectedDistricts = [],
  selectedPhenomena = [],
  showFoothill = true,
  currentDay = 1,
  activeDays = new Set([1]),
  weeklyForecastData = Array(7)
    .fill(null)
    .map(() => ({})),
  weeklyWarningData = Array(7)
    .fill(null)
    .map(() => ({})),
  weeklyData = weeklyForecastData, // Default to Forecast
  currentReviewMode = null, // Default to null (no specific review mode active)
  districtPhenomenaMap = weeklyData[0],
  phenomenaMarkersLayer,
  isAudioEnabled = false,
  currentAudio = new Audio();
let isLayoutEditMode = false;

let currentLang = localStorage.getItem("lang") || "hi";

const uiTranslations = {
  hi: {
    title: "बिहार मौसम पूर्वानुमान प्रणाली",
    regional: "क्षेत्रीय समूह चुनें:",
    multiple: "एकाधिक जिले चुनें:",
    searchPlaceholder: "जिला खोजें...",
    placeCount: "FORECAST",
    warning: "WARNING",
    colorSelect: "COLOR SELECTION",
    phenomena: "मौसम घटनाएँ:",
    forecastRes: "पूर्वानुमान परिणाम:",
    btnGenerate: "पूर्वानुमान तैयार करें",
    btnUpdateForecast: "Forecast Map Update",
    btnUpdateWarning: "Warning Map Update",
    btnClear: "साफ़ करें",
    btnExportTxt: "टेक्स्ट निर्यात करें",
    btnExportPdf: "PDF निर्यात करें",
    btnCopy: "क्लिपबोर्ड पर कॉपी करें",
    btnSelectAll: "सभी चुनें",
    btnClearAll: "साफ़ करें",
    placeholder: "कोई जिला चुने और मौसम घटनाएँ चुनें...",
    placeOptions: [
      "शुष्क (Dry)",
      "एक या दो स्थानों पर",
      "कुछ स्थानों पर",
      "अनेक स्थानों पर",
      "अधिकांश स्थानों पर",
    ],
  },
  en: {
    title: "Bihar Weather Forecast System",
    regional: "Select Regional Groups:",
    multiple: "Select Multiple Districts:",
    searchPlaceholder: "Search District...",
    placeCount: "FORECAST",
    warning: "WARNING",
    colorSelect: "COLOR SELECTION",
    phenomena: "Weather Phenomena:",
    forecastRes: "Forecast Result:",
    btnGenerate: "Generate Forecast",
    btnUpdateForecast: "Forecast Map Update",
    btnUpdateWarning: "Warning Map Update",
    btnClear: "Clear",
    btnExportTxt: "Export Text",
    btnExportPdf: "Export PDF",
    btnCopy: "Copy to Clipboard",
    btnSelectAll: "Select All",
    btnClearAll: "Clear All",
    placeholder: "Select a district and weather phenomena...",
    placeOptions: [
      "Dry Weather",
      "At one or two places",
      "At a few places",
      "At many places",
      "At most places",
    ],
  },
};

// ---------- Phenomena + Scripts.xlsx sub-options ----------
const phenDefs = [
  {
    id: "thunderstorm",
    hindi: "मेघगर्जन/वज्रपात",
    english: "Thunderstorm/Lightning",
    icon: "fa-cloud-bolt",
    sub: [
      "हल्के से मध्यम दर्जे की मेघ गर्जन तथा वज्रपात के साथ वर्षा जारी रहने की संभावना है।",
      "मध्यम दर्जे की मेघ गर्जन, वज्रपात के साथ वर्षा होने की प्रबल संभावना है।",
      "हल्के से मध्यम दर्जे की मेघ गर्जन, वज्रपात, (हवा की गति 30-40 कि. मी. प्रति घंटे तक) के साथ हल्की वर्षा होने की संभावना है।",
      "मध्यम दर्जे की मेघ गर्जन, वज्रपात,हवा (हवा की गति 40-50 कि. मी. प्रति घंटे तक) के साथ वर्षा होने की प्रबल संभावना है।",
      "तीव्र दर्जे की मेघ गर्जन, वज्रपात तथा भारी वर्षा के साथ तेज हवा (हवा की गति 50-60 कि. मी. प्रति घंटे तक) की प्रबल संभावना है।",
      "मेघ गर्जन, वज्रपात, ओलावृष्टि एवं  हवा (हवा की गति 40-50 कि. मी. प्रति घंटे तक) के साथ वर्षा होने की प्रबल संभावना है।",
    ],
  },
  {
    id: "gustywind",
    hindi: "तेज़ हवा",
    english: "Gusty Wind",
    icon: "fa-wind",
    sub: [
      "तेज़ हवा (हवा की गति 30-40 कि. मी. प्रति घंटे तक) रहने की संभावना है।",
      "तेज़ हवा (हवा की गति 40-50 कि. मी. प्रति घंटे तक) रहने की संभावना है।",
      "तेज़ हवा (हवा की गति 50-60 कि. मी. प्रति घंटे तक) रहने की संभावना है।",
    ],
  },
  {
    id: "heatwave",
    hindi: "लू (उष्ण लहर)",
    english: "Heat Wave",
    icon: "fa-fire",
    sub: [
      "लू (उष्ण लहर ) की संभावना है ।",
      "उष्ण दिवस होने की संभावना है।",
      "अत्यधिक भीषण उष्ण लहर (लू) की संभावना है।",
    ],
  },
  {
    id: "hailstorm",
    hindi: "ओलावृष्टि",
    english: "Hailstorm",
    icon: "fa-cloud-meatball",
    sub: ["ओलावृष्टि की संभावना है।"],
  },
  {
    id: "heavyrain",
    hindi: "भारी वर्षा",
    english: "Heavy Rainfall",
    icon: "fa-cloud-showers-heavy",
    sub: ["भारी वर्षा होने की संभावना है।"],
  },
  {
    id: "densefog",
    hindi: "घना कोहरा",
    english: "Dense Fog",
    icon: "fa-smog",
    sub: [
      "घना कोहरा / कुहासा छाए रहने की प्रबल संभावना है।",
      "घना से बहुत घना कोहरा / कुहासा छाए रहने की प्रबल संभावना है।",
    ],
  },
  {
    id: "coldday",
    hindi: "शीत दिवस",
    english: "Cold Day",
    icon: "fa-snowflake",
    sub: ["शीत दिवस होने की संभावना है।"],
  },
  {
    id: "warmnight",
    hindi: "गर्म रात्रि",
    english: "Warm Night",
    icon: "fa-temperature-high",
    sub: ["गर्म रात्रि की संभावना है ।"],
  },
];

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  buildRegionalGrid();
  buildMultipleDistrictGrid();
  buildPhenomenaPanel();
  buildColorSelectionDropdown();
  attachHandlers();
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    document.getElementById("darkModeToggle").innerHTML =
      '<i class="fas fa-sun"></i>';
    document.getElementById("darkModeToggle").title = "Light Mode";
  }
  updateLanguageUI();
  initMap();
  validateDistrictCoverage();
  loadSavedData(); // Load data on startup
  updateDateTime();
  setInterval(updateDateTime, 1000);
  fetchTemperature();
  setInterval(fetchTemperature, 900000); // 15 minutes
  initVisitorCounter();

  // Check login persistence
  if (localStorage.getItem("admin_logged_in") === "true") {
    document.body.classList.add("logged-in");
    const btn = document.getElementById("btnToggleDrag");
    if (btn) btn.style.display = "inline-block";
  }
});

// ---------- UI builders ----------
function buildRegionalGrid() {
  const box = document.getElementById("regionalGrid");
  Object.entries(regionalGroups).forEach(([key, g]) => {
    const lbl = document.createElement("label");
    lbl.className = `regional-checkbox region-${key}`;
    const text = currentLang === "hi" ? g.name : g.english;
    lbl.innerHTML = `<input type="checkbox" value="${key}" onchange="handleRegionChange(this)"><span>${text}</span>`;
    box.appendChild(lbl);
  });
}
function buildMultipleDistrictGrid() {
  const grid = document.getElementById("districtGrid");
  districtsData.forEach((d) => {
    const lbl = document.createElement("label");
    lbl.className = "district-checkbox";
    const text = currentLang === "hi" ? d.hindi : d.name;
    lbl.innerHTML = `<input type="checkbox" value="${d.id}" onchange="updateMultipleSelection()"><span>${text}</span>`;
    grid.appendChild(lbl);
  });
}
function buildPhenomenaPanel() {
  const box = document.getElementById("phenomenaContainer");
  phenDefs.forEach((d) => {
    const row = document.createElement("div");
    row.className = "phenomenon-row";
    row.style.borderLeft = `5px solid ${phenColors[d.id]}`;
    const name = currentLang === "hi" ? d.hindi : d.english;
    const lines =
      currentLang === "hi" ? intensityLines[d.id] : intensityLinesEn[d.id];
    row.innerHTML = `
      <input class="main-check same-size" type="checkbox" value="${d.id}" onchange="togglePhenom('${d.id}')">
      <div class="phenom-icon"><i class="fas ${d.icon} phenom-anim-${d.id}"></i></div>
      <label><strong>${name}</strong></label>
      <select class="sub-select intensity-select same-size" id="intensity-${d.id}">
        ${lines.map((s, i) => `<option value="${i}">${s}</option>`).join("")}
      </select>`;
    box.appendChild(row);
  });
}
function buildColorSelectionDropdown() {
  const select = document.getElementById("globalColorSelect");
  select.innerHTML = "";
  combinedColorOptions.forEach((opt) => {
    const option = document.createElement("option");
    option.value = opt.color || "";
    option.innerText = opt.text;
    if (opt.color) option.style.backgroundColor = opt.color;
    select.appendChild(option);
  });
}

// ---------- Handlers ----------
function attachHandlers() {
  document.getElementById("districtSearch").oninput = filterDistricts;
  document.getElementById("generateForecast").onclick = generateForecast;
  document.getElementById("clearSelection").onclick = clearSelection;
  document.getElementById("exportText").onclick = exportToText;
  document.getElementById("exportPDF").onclick = exportToPDF;
  document.getElementById("copyClipboard").onclick = copyToClipboard;
  document.getElementById("darkModeToggle").onclick = toggleDarkMode;
  document.getElementById("langToggle").onclick = toggleLanguage;
  document.getElementById("backToTop").onclick = scrollToTop;
  document.getElementById("toggleFoothill").onchange = (e) => {
    showFoothill = e.target.checked;
    updateMapStyle();
    updateLegend();
  };
  document.getElementById("updateForecastMap").onclick = () =>
    handleMapUpdate("forecast");
  document.getElementById("updateWarningMap").onclick = () =>
    handleMapUpdate("warning");
  document.getElementById("clearMapSelection").onclick = clearDistrictSelection;
  document.getElementById("downloadMap").onclick = downloadMapImage;
  document.getElementById("downloadSmartImages").onclick = downloadSmartImages;
  document.getElementById("downloadSmartPDF").onclick = downloadSmartPDF;
  document.getElementById("toggleStreetView").onchange = (e) => {
    toggleTiles(e.target.checked);
  };
  document.getElementById("toggleAnimations").onchange = (e) => {
    const mapDiv = document.getElementById("map");
    if (e.target.checked) {
      mapDiv.classList.remove("static-icons");
    } else {
      mapDiv.classList.add("static-icons");
    }
  };
  document.getElementById("toggleSatelliteView").onchange = (e) => {
    toggleSatellite(e.target.checked);
  };
  document.getElementById("toggleHybridView").onchange = (e) => {
    toggleHybrid(e.target.checked);
  };
  document.getElementById("fitMapBounds").onclick = () => {
    if (geojsonLayer) map.fitBounds(geojsonLayer.getBounds());
  };
  document.getElementById("copyDayData").onclick = copyCurrentDayToAll;
  document.getElementById("copyDayDataSelect").onclick = openCopyModal;
  document.querySelectorAll(".map-region-check").forEach((cb) => {
    cb.onchange = (e) => toggleMapRegion(e.target.value, e.target.checked);
  });
  document.getElementById("openDisplayHeader").onclick = () => {
    window.open("display.html", "_blank");
  };
  document.getElementById("openLivePreview").onclick = () => {
    window.open("live.html", "_blank");
  };
  document.getElementById("toggleAudioEffects").onchange = (e) => {
    isAudioEnabled = e.target.checked;
    const slider = document.getElementById("audioVolumeSlider");
    if (slider) slider.style.display = isAudioEnabled ? "block" : "none";
    if (!isAudioEnabled) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } else {
      // If enabled, check if any phenomenon is already selected and play its sound
      const checked = document.querySelector(
        "#phenomenaContainer input:checked",
      );
      if (checked) togglePhenom(checked.value);
    }
  };
  const volSlider = document.getElementById("audioVolumeSlider");
  if (volSlider) {
    currentAudio.volume = volSlider.value;
    volSlider.oninput = (e) => (currentAudio.volume = e.target.value);
  }

  // Audio Visualizer Events
  currentAudio.onplay = () => {
    const ind = document.getElementById("audioPlayingIndicator");
    if (ind) ind.style.display = "block";
  };
  currentAudio.onpause = () => {
    const ind = document.getElementById("audioPlayingIndicator");
    if (ind) ind.style.display = "none";
  };
  currentAudio.onended = () => {
    const ind = document.getElementById("audioPlayingIndicator");
    if (ind) ind.style.display = "none";
  };

  document.getElementById("userLogoBtn").onclick = handleUserLogoClick;

  // Dropdown Color Handlers
  document.getElementById("globalPlaceCount").addEventListener("change", () => {
    updateDropdownBackgrounds();
    updateLegend();
  });
  document.getElementById("globalWarning").addEventListener("change", () => {
    updateDropdownBackgrounds();
    updateMapStyle(); // Update map fill color based on warning
    updateLegend();
  });
  document
    .getElementById("globalColorSelect")
    .addEventListener("change", (e) => {
      const val = e.target.value;
      if (val) {
        e.target.style.backgroundColor = val;
      } else {
        e.target.style.backgroundColor = "";
      }
    });

  // Mode Checkbox Handlers
  const modeForecast = document.getElementById("modeForecast");
  const modeWarning = document.getElementById("modeWarning");

  if (modeForecast && modeWarning) {
    modeForecast.addEventListener("change", () => {
      if (modeForecast.checked) {
        modeWarning.checked = false;
      } else if (!modeWarning.checked) {
        modeForecast.checked = true; // Enforce one always on
      }
      setReviewMode("forecast");
      updateMapStyle();
      updateLegend();
    });

    modeWarning.addEventListener("change", () => {
      if (modeWarning.checked) {
        modeForecast.checked = false;
      } else if (!modeForecast.checked) {
        modeWarning.checked = true; // Enforce one always on
      }
      setReviewMode("warning");
      updateMapStyle();
      updateLegend();
    });
  }

  // Clear Forecast & Warning Button
  const btnClearFW = document.getElementById("btnClearFW");
  if (btnClearFW) btnClearFW.onclick = clearForecastWarningData;

  // Show Update Button Handler
  const btnShowUpdate = document.getElementById("btnShowUpdate");
  if (btnShowUpdate) {
    btnShowUpdate.onclick = () => {
      const options = document.getElementById("hiddenUpdateOptions");
      if (options)
        options.style.display =
          options.style.display === "none" ? "flex" : "none";
    };
  }

  const btnToggleDrag = document.getElementById("btnToggleDrag");
  if (btnToggleDrag) {
    btnToggleDrag.onclick = toggleLayoutEditMode;
  }

  document
    .getElementById("toggleLegend")
    .addEventListener("change", updateLegend);
}
function updateMultipleSelection() {
  selectedDistricts = Array.from(
    document.querySelectorAll("#districtGrid input:checked"),
  ).map((cb) => cb.value);
  updateMapStyle();
}
function filterDistricts() {
  const query = document.getElementById("districtSearch").value.toLowerCase();
  document
    .querySelectorAll("#districtGrid .district-checkbox")
    .forEach((lbl) => {
      const text = lbl.innerText.toLowerCase();
      lbl.style.display = text.includes(query) ? "flex" : "none";
    });
}
function handleRegionChange(checkbox) {
  const val = checkbox.value;
  const checked = checkbox.checked;
  const hierarchy = {
    northern: ["foothill", "north-west", "north-central", "north-east"],
    southern: ["south-west", "south-central", "south-east"],
  };
  if (hierarchy[val] && checked) {
    hierarchy[val].forEach((sub) => {
      const el = document.querySelector(`#regionalGrid input[value="${sub}"]`);
      if (el) el.checked = true;
    });
  }
  updateRegionalSelection();
}
function updateRegionalSelection() {
  const checkedRegions = Array.from(
    document.querySelectorAll("#regionalGrid input:checked"),
  ).map((cb) => cb.value);
  const regionDistricts = new Set();

  checkedRegions.forEach((key) => {
    if (regionalGroups[key]) {
      regionalGroups[key].districts.forEach((d) =>
        regionDistricts.add(String(d)),
      );
    }
  });

  document.querySelectorAll("#districtGrid input").forEach((cb) => {
    const parent = cb.closest(".district-checkbox");
    if (regionDistricts.has(cb.value)) {
      cb.checked = true;
      parent.classList.add("highlighted");
    } else if (parent.classList.contains("highlighted")) {
      cb.checked = false;
      parent.classList.remove("highlighted");
    }
  });

  updateMultipleSelection();
}
function selectAllRegions() {
  document
    .querySelectorAll("#regionalGrid input")
    .forEach((cb) => (cb.checked = true));
  updateRegionalSelection();
}
function clearRegionalSelection() {
  document
    .querySelectorAll("#regionalGrid input")
    .forEach((cb) => (cb.checked = false));
  updateRegionalSelection();
}
function selectAllDistricts() {
  document
    .querySelectorAll("#districtGrid input")
    .forEach((cb) => (cb.checked = true));
  updateMultipleSelection();
}
function clearDistrictSelection() {
  document.querySelectorAll("#districtGrid input").forEach((cb) => {
    cb.checked = false;
    cb.closest(".district-checkbox").classList.remove("highlighted");
  });
  document
    .querySelectorAll("#regionalGrid input")
    .forEach((cb) => (cb.checked = false));
  document
    .querySelectorAll(".map-region-check")
    .forEach((cb) => (cb.checked = false));
  updateMapStyle();
  updateMultipleSelection();
}

function setReviewMode(mode) {
  const btnF = document.getElementById("btnReviewForecast");
  const btnW = document.getElementById("btnReviewWarning");
  const modeForecast = document.getElementById("modeForecast");
  const modeWarning = document.getElementById("modeWarning");
  const headerText = document.getElementById("mapHeaderText");

  // Toggle logic: if clicking the already active mode, deselect it
  if (currentReviewMode === mode) {
    currentReviewMode = null;
    // Reset buttons
    if (btnF) {
      btnF.style.background = ""; // Reset to default CSS
      btnF.style.color = "#333";
    }
    if (btnW) {
      btnW.style.background = ""; // Reset to default CSS
      btnW.style.color = "#333";
    }

    // Revert to the data selected in the control panel
    if (modeForecast && modeForecast.checked) {
      weeklyData = weeklyForecastData;
    } else {
      weeklyData = weeklyWarningData;
    }
    // Hide header text
    if (headerText) headerText.style.display = "none";
  } else {
    currentReviewMode = mode;
    if (mode === "forecast") {
      weeklyData = weeklyForecastData;
      if (btnF) {
        btnF.style.background = "#17a2b8";
        btnF.style.color = "white";
      }
      if (btnW) {
        btnW.style.background = "";
        btnW.style.color = "#333";
      }
    } else {
      weeklyData = weeklyWarningData;
      if (btnF) {
        btnF.style.background = "";
        btnF.style.color = "#333";
      }
      if (btnW) {
        btnW.style.background = "#28a745";
        btnW.style.color = "white";
      }
    }
    // Show header text
    if (headerText) headerText.style.display = "block";
  }

  // Update current day view based on new mode data
  districtPhenomenaMap = weeklyData[currentDay - 1];

  updateMapHeaderText();
  updateMapStyle();
  updateLegend();
}

function togglePhenom(id) {
  // Play/Stop sound based on checkbox state
  const checkbox = document.querySelector(
    `#phenomenaContainer input[value="${id}"]`,
  );

  if (checkbox && checkbox.checked) {
    if (isAudioEnabled && weatherSounds[id]) {
      if (!currentAudio.paused) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      currentAudio.src = weatherSounds[id];
      currentAudio.play().catch((e) => console.warn("Audio play failed:", e));
    }
  } else {
    updateLegend(); // Update legend when checkbox changes
    // Stop audio if unchecked
    if (!currentAudio.paused) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
  }
  updateLegend();
}

// ---------- Forecast ----------
function generateForecast() {
  if (!selectedDistricts.length) {
    alert("कृपया कम से कम एक जिला चुनें।");
    return;
  }

  // Pre-check to avoid showing spinner if no phenomena selected
  if (
    document.querySelectorAll("#phenomenaContainer input:checked").length === 0
  ) {
    alert("कृपया कम से कम एक मौसम घटना चुनें।");
    return;
  }

  const overlay = document.getElementById("loadingOverlay");
  if (overlay) overlay.style.display = "flex";

  // Delay to allow spinner to render
  setTimeout(() => {
    selectedPhenomena = []; // सिर्फ़ चेक किए गए
    document
      .querySelectorAll("#phenomenaContainer input:checked")
      .forEach((inp) => {
        const phenom = inp.value;
        const intensity = document.getElementById(
          `intensity-${phenom}`,
        ).selectedIndex;
        const place = document.getElementById("globalPlaceCount").value;
        selectedPhenomena.push({ phenom, intensity, place });
      });

    const forecasts = selectedDistricts
      .map((id) => makeForecastSentence(id, selectedPhenomena))
      .filter(Boolean);
    displayConsolidatedForecast(forecasts);

    if (overlay) overlay.style.display = "none";
  }, 800);
}
function makeForecastSentence(districtId, phenList) {
  const d = getDistrictNameById(districtId);
  if (!d) return null;
  return { district: d, phenList };
}

function displayConsolidatedForecast(list) {
  const distNames = list.map((x) =>
    currentLang === "hi" ? x.district.hindi : x.district.name,
  );
  const joiner = currentLang === "hi" ? " और " : " and ";
  const distStr =
    distNames.length === 1
      ? distNames[0]
      : distNames.length === 2
        ? distNames.join(joiner)
        : distNames.slice(0, -1).join(", ") +
          joiner +
          distNames[distNames.length - 1];

  let html = "";
  selectedPhenomena.forEach((p) => {
    const color = phenColors[p.phenom];
    const intensitySentence =
      currentLang === "hi"
        ? intensityLines[p.phenom][p.intensity]
        : intensityLinesEn[p.phenom][p.intensity];

    const placePhrase = uiTranslations[currentLang].placeOptions[p.place];

    const phenomName =
      currentLang === "hi"
        ? phenDefs.find((x) => x.id === p.phenom).hindi
        : phenDefs.find((x) => x.id === p.phenom).english;

    let finalSentence = "";
    if (currentLang === "hi") {
      finalSentence = `${distStr} जिलों के ${placePhrase} ${intensitySentence}`;
    } else {
      finalSentence = `${intensitySentence} ${placePhrase} over ${distStr} district(s).`;
    }

    html += `<div class="forecast-item" style="background:${color}20; border-left:5px solid ${color};">
               <strong>${phenomName}</strong>
               <p style="margin-top:10px;font-size:1.05em">${finalSentence}</p>
             </div>`;
  });
  document.getElementById("forecastContent").innerHTML = html;
}

// ---------- Export ----------
function exportToText() {
  const txt = document.getElementById("forecastContent").innerText;
  if (!txt || txt.includes("कोई जिला चुने")) {
    alert("पहले पूर्वानुमान तैयार करें।");
    return;
  }
  const blob = new Blob([txt], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `forecast-${new Date().toISOString().split("T")[0]}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}
function exportToPDF() {
  const html = document.getElementById("forecastContent").innerHTML;
  if (!html || html.includes("कोई जिला चुने")) {
    alert("पहले पूर्वानुमान तैयार करें।");
    return;
  }
  const win = window.open("", "_blank");
  win.document.write(
    `<html><head><title>बिहार मौसम पूर्वानुमान</title><style>body{font-family:'Noto Sans Devanagari',sans-serif;padding:20px}</style></head><body><h1>बिहार मौसम पूर्वानुमान</h1><p>तिथि: ${new Date().toLocaleString(
      "hi-IN",
    )}</p>${html}</body></html>`,
  );
  win.document.close();
  win.print();
}
function downloadMapImage() {
  const node = document.getElementById("map");
  node.classList.add("static-icons"); // Freeze animations
  // Use dom-to-image to capture the map div
  domtoimage
    .toPng(node, {
      width: node.offsetWidth,
      height: node.offsetHeight,
    })
    .then(function (dataUrl) {
      const link = document.createElement("a");
      link.download = `bihar-weather-map-${
        new Date().toISOString().split("T")[0]
      }.png`;
      link.href = dataUrl;
      link.click();
    })
    .catch(function (error) {
      console.error("Map download failed:", error);
      alert("मैप इमेज डाउनलोड करने में त्रुटि हुई।");
    })
    .finally(function () {
      node.classList.remove("static-icons"); // Unfreeze
    });
}
async function download7DaysPDF() {
  // Deprecated in favor of downloadSmartPDF
  downloadSmartPDF();
  // Deprecated in favor of downloadSmartPDF
  downloadSmartPDF();
}

async function downloadSmartPDF() {
  const chkForecast = document.getElementById("chkDlForecast").checked;
  const chkWarning = document.getElementById("chkDlWarning").checked;

  if (!chkForecast && !chkWarning) {
    alert("Please select at least one type (Forecast or Warning) to download.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: "landscape" });
  const originalDay = currentDay;
  const originalReviewMode = currentReviewMode;
  const originalWeeklyData = weeklyData;

  const overlay = document.getElementById("loadingOverlay");
  if (overlay) {
    overlay.style.display = "flex";
    overlay.querySelector("p").innerText = "Generating Smart PDF...";
  }

  try {
    const processType = async (type, dataArray) => {
      // Set context for rendering
      currentReviewMode = type;
      weeklyData = dataArray;

      const groups = getDayGroups(dataArray);

      for (const group of groups) {
        // Set day to start of group (header logic will handle the range text)
        currentDay = group.start;
        districtPhenomenaMap = weeklyData[currentDay - 1];

        // Update Map UI
        updateMapDateHeader();
        updateMapHeaderText();
        updateMapStyle();
        updateLegend();

        // Wait for render
        await new Promise((r) => setTimeout(r, 800));

        const node = document.getElementById("map");
        node.classList.add("static-icons"); // Freeze animations
        const canvas = await domtoimage.toPng(node, {
          width: node.offsetWidth,
          height: node.offsetHeight,
          bgcolor: "#ffffff",
        });

        const groups = getDayGroups(dataArray);
        // Add page (if not first page)
        if (doc.internal.pages.length > 1) doc.addPage();

        const imgProps = doc.getImageProperties(canvas);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        doc.addImage(canvas, "PNG", 0, 0, pdfWidth, pdfHeight);
        node.classList.remove("static-icons"); // Unfreeze
      }
    };

    if (chkForecast) {
      await processType("forecast", weeklyForecastData);
    }
    if (chkWarning) {
      await processType("warning", weeklyWarningData);
    }

    doc.save(
      `Bihar_Weather_Smart_Report_${
        new Date().toISOString().split("T")[0]
      }.pdf`,
    );
  } catch (e) {
    console.error("PDF Generation Error:", e);
    alert("PDF generate karne me truti hui.");
  } finally {
    // Restore state
    currentDay = originalDay;
    currentReviewMode = originalReviewMode;
    weeklyData = originalWeeklyData;
    districtPhenomenaMap = weeklyData[currentDay - 1];

    // Refresh UI
    updateMapDateHeader();
    updateMapHeaderText();
    updateMapStyle();
    updateLegend();

    if (overlay) {
      overlay.style.display = "none";
      overlay.querySelector("p").innerText =
        "पूर्वानुमान तैयार किया जा रहा है... / Generating Forecast...";
    }
  }
}

async function downloadSmartImages() {
  const chkForecast = document.getElementById("chkDlForecast").checked;
  const chkWarning = document.getElementById("chkDlWarning").checked;

  if (!chkForecast && !chkWarning) {
    alert("Please select at least one type (Forecast or Warning) to download.");
    return;
  }

  const originalDay = currentDay;
  const originalReviewMode = currentReviewMode;
  const originalWeeklyData = weeklyData;

  const today = new Date().toISOString().split("T")[0];
  const overlay = document.getElementById("loadingOverlay");

  if (overlay) {
    overlay.style.display = "flex";
    overlay.querySelector("p").innerText = "Downloading Smart Images...";
  }

  try {
    const processType = async (type, dataArray) => {
      currentReviewMode = type;
      weeklyData = dataArray;
      const groups = getDayGroups(dataArray);

      for (const group of groups) {
        currentDay = group.start;
        districtPhenomenaMap = weeklyData[currentDay - 1];

        updateMapDateHeader();
        updateMapHeaderText();
        updateMapStyle();
        updateLegend();

        await new Promise((r) => setTimeout(r, 800));

        const node = document.getElementById("map");
        node.classList.add("static-icons"); // Freeze animations
        const dataUrl = await domtoimage.toPng(node, {
          width: node.offsetWidth,
          height: node.offsetHeight,
        });
        node.classList.remove("static-icons"); // Unfreeze

        const link = document.createElement("a");
        const rangeStr =
          group.start === group.end
            ? `Day-${group.start}`
            : `Day-${group.start}-to-${group.end}`;
        link.download = `${today}-${type}-${rangeStr}.png`;
        link.href = dataUrl;
        link.click();
      }
    };

    if (chkForecast) await processType("forecast", weeklyForecastData);
    if (chkWarning) await processType("warning", weeklyWarningData);
  } catch (e) {
    console.error("Image Download Error:", e);
  } finally {
    // Restore state
    currentDay = originalDay;
    currentReviewMode = originalReviewMode;
    weeklyData = originalWeeklyData;
    districtPhenomenaMap = weeklyData[currentDay - 1];

    updateMapDateHeader();
    updateMapHeaderText();
    updateMapStyle();
    updateLegend();

    if (overlay) {
      overlay.style.display = "none";
      overlay.querySelector("p").innerText =
        "पूर्वानुमान तैयार किया जा रहा है... / Generating Forecast...";
    }
  }
}

function getDayGroups(dataArray) {
  const groups = [];
  let i = 0;
  while (i < 7) {
    let start = i + 1;
    let end = i + 1;
    while (end < 7 && areDaysEqual(dataArray[end - 1], dataArray[end])) {
      end++;
    }
    groups.push({ start, end });
    i = end;
  }
  return groups;
}

function downloadAllMaps() {
  // Deprecated in favor of downloadSmartImages
  downloadSmartImages();
}

function copyToClipboard() {
  const txt = document.getElementById("forecastContent").innerText;
  if (!txt || txt.includes("कोई जिला चुने")) {
    alert("पहले पूर्वानुमान तैयार करें।");
    return;
  }
  navigator.clipboard
    .writeText(txt)
    .then(() => {
      alert("पूर्वानुमान क्लिपबोर्ड पर कॉपी किया गया!");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
      alert("कॉपी करने में विफल।");
    });
}
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDark);
  const btn = document.getElementById("darkModeToggle");
  btn.innerHTML = isDark
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
  btn.title = isDark ? "Light Mode" : "Dark Mode";
}

function toggleLanguage() {
  currentLang = currentLang === "hi" ? "en" : "hi";
  localStorage.setItem("lang", currentLang);
  updateLanguageUI();
}

function updateLanguageUI() {
  const t = uiTranslations[currentLang];
  const btn = document.getElementById("langToggle");
  btn.innerText = currentLang.toUpperCase();

  // Header
  document.querySelector("header h1").innerText = t.title;
  const h2 = document.querySelector("header h2");
  if (h2) h2.style.display = "none";

  // Labels
  document.querySelector("#regionalGroups label").innerText = t.regional;
  document.querySelector("#multipleDistricts label").innerText = t.multiple;
  document.querySelector(".place-count-panel label").innerText = t.placeCount;
  const warningLabel = document.querySelector(".warning-panel label");
  if (warningLabel) warningLabel.innerText = t.warning;
  const colorLabel = document.querySelector(".color-selection-panel label");
  if (colorLabel) colorLabel.innerText = t.colorSelect;
  document.querySelector(".weather-phenomena h3").innerText = t.phenomena;
  document.querySelector(".forecast-output h3").innerText = t.forecastRes;

  // Search Placeholder
  document.getElementById("districtSearch").placeholder = t.searchPlaceholder;

  // Buttons
  document.getElementById("generateForecast").innerText = t.btnGenerate;
  document.getElementById("updateForecastMap").innerText = t.btnUpdateForecast;
  document.getElementById("updateWarningMap").innerText = t.btnUpdateWarning;
  document.getElementById("clearSelection").innerText = t.btnClear;
  document.getElementById("exportText").innerText = t.btnExportTxt;
  document.getElementById("exportPDF").innerText = t.btnExportPdf;
  document.getElementById("copyClipboard").innerText = t.btnCopy;

  // Select All / Clear All buttons
  const regBtns = document.querySelectorAll("#regionalGroups button");
  if (regBtns.length >= 2) {
    regBtns[0].innerText = t.btnSelectAll;
    regBtns[1].innerText = t.btnClearAll;
  }
  const distBtns = document.querySelectorAll("#multipleDistricts button");
  if (distBtns.length >= 2) {
    distBtns[0].innerText = t.btnSelectAll;
    distBtns[1].innerText = t.btnClearAll;
  }

  // Update Regional Grid Text
  document
    .querySelectorAll("#regionalGrid .regional-checkbox")
    .forEach((lbl) => {
      const input = lbl.querySelector("input");
      const key = input.value;
      const group = regionalGroups[key];
      const span = lbl.querySelector("span");
      if (group && span) {
        span.innerText = currentLang === "hi" ? group.name : group.english;
      }
    });

  // Update District Grid Text
  document
    .querySelectorAll("#districtGrid .district-checkbox")
    .forEach((lbl) => {
      const input = lbl.querySelector("input");
      const id = parseInt(input.value);
      const dist = districtsData.find((d) => d.id === id);
      const span = lbl.querySelector("span");
      if (dist && span) {
        span.innerText = currentLang === "hi" ? dist.hindi : dist.name;
      }
    });

  // Update Phenomena Panel
  document
    .querySelectorAll("#phenomenaContainer .phenomenon-row")
    .forEach((row) => {
      const input = row.querySelector("input");
      const id = input.value;
      const pDef = phenDefs.find((p) => p.id === id);
      const label = row.querySelector("label");
      if (pDef && label) {
        const text = currentLang === "hi" ? pDef.hindi : pDef.english;
        label.innerHTML = `<strong>${text}</strong>`;
      }
      const select = row.querySelector("select");
      if (select && pDef) {
        const lines =
          currentLang === "hi" ? intensityLines[id] : intensityLinesEn[id];
        const selectedIdx = select.selectedIndex;
        select.innerHTML = lines
          .map((s, i) => `<option value="${i}">${s}</option>`)
          .join("");
        if (selectedIdx < lines.length) select.selectedIndex = selectedIdx;
      }
    });

  // Update Place Count Dropdown
  const placeSelect = document.getElementById("globalPlaceCount");
  if (placeSelect) {
    const selectedVal = placeSelect.value;
    placeSelect.innerHTML = "";
    forecastDropdownOptions.forEach((optData) => {
      const opt = document.createElement("option");
      opt.value = optData.value;
      opt.innerText = optData.text;
      if (optData.color) opt.style.backgroundColor = optData.color;
      placeSelect.appendChild(opt);
    });
    placeSelect.value = selectedVal;
  }

  // Update Warning Dropdown
  const warningSelect = document.getElementById("globalWarning");
  if (warningSelect) {
    const selectedVal = warningSelect.value;
    warningSelect.innerHTML = "";
    warningDropdownOptions.forEach((optData) => {
      const opt = document.createElement("option");
      opt.value = optData.value;
      opt.innerText = optData.text;
      if (optData.color) opt.style.backgroundColor = optData.color;
      warningSelect.appendChild(opt);
    });
    warningSelect.value = selectedVal;
  }
  updateDropdownBackgrounds();
}

function updateDropdownBackgrounds() {
  const pSelect = document.getElementById("globalPlaceCount");
  if (pSelect) {
    const val = parseInt(pSelect.value);
    const opt = forecastDropdownOptions.find((o) => o.value === val);
    if (opt && opt.color) {
      pSelect.style.backgroundColor = opt.color;
    } else {
      pSelect.style.backgroundColor = "";
    }
  }
  const wSelect = document.getElementById("globalWarning");
  if (wSelect) {
    const val = parseInt(wSelect.value);
    const opt = warningDropdownOptions.find((o) => o.value === val);
    if (opt && opt.color) {
      wSelect.style.backgroundColor = opt.color;
    } else {
      wSelect.style.backgroundColor = "";
    }
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---------- Clear ----------
function clearSelection() {
  selectedDistricts = [];
  selectedPhenomena = [];
  weeklyData[currentDay - 1] = {};
  districtPhenomenaMap = weeklyData[currentDay - 1];

  // If in multi-select mode, clear all active days
  activeDays.forEach((dayNum) => {
    weeklyData[dayNum - 1] = {};
  });

  document.querySelectorAll("#districtGrid input").forEach((cb) => {
    cb.checked = false;
    cb.closest(".district-checkbox").classList.remove("highlighted");
  });
  document
    .querySelectorAll("#regionalGrid input")
    .forEach((cb) => (cb.checked = false));
  document
    .querySelectorAll("#phenomenaContainer input")
    .forEach((cb) => (cb.checked = false));
  document
    .querySelectorAll(".intensity-select")
    .forEach((s) => (s.selectedIndex = 0));
  document.getElementById("forecastContent").innerHTML =
    '<p class="placeholder-text">कोई जिला चुने और मौसम घटनाएँ चुनें...</p>';
  updateMapStyle();
  saveData();
  updateLegend();
}

function clearForecastWarningData() {
  if (!confirm("Are you sure you want to clear all Forecast and Warning data?"))
    return;

  weeklyForecastData = Array(7)
    .fill(null)
    .map(() => ({}));
  weeklyWarningData = Array(7)
    .fill(null)
    .map(() => ({}));

  if (!confirm("Are you sure you want to clear all Forecast and Warning data?"))
    return;

  weeklyForecastData = Array(7)
    .fill(null)
    .map(() => ({}));
  weeklyWarningData = Array(7)
    .fill(null)
    .map(() => ({}));

  // Reset current working data based on active checkboxes
  const modeForecast = document.getElementById("modeForecast");
  weeklyData =
    modeForecast && modeForecast.checked
      ? weeklyForecastData
      : weeklyWarningData;
  weeklyData =
    modeForecast && modeForecast.checked
      ? weeklyForecastData
      : weeklyWarningData;
  districtPhenomenaMap = weeklyData[currentDay - 1];

  saveData();
  updateMapStyle();
  alert("Forecast and Warning data cleared.");
}

function resetUI() {
  selectedDistricts = [];
  selectedPhenomena = [];

  document.querySelectorAll("#districtGrid input").forEach((cb) => {
    cb.checked = false;
    cb.closest(".district-checkbox").classList.remove("highlighted");
  });
  document
    .querySelectorAll("#regionalGrid input")
    .forEach((cb) => (cb.checked = false));
  document
    .querySelectorAll(".map-region-check")
    .forEach((cb) => (cb.checked = false));
  document
    .querySelectorAll("#phenomenaContainer input")
    .forEach((cb) => (cb.checked = false));
  document
    .querySelectorAll(".intensity-select")
    .forEach((s) => (s.selectedIndex = 0));

  const pSelect = document.getElementById("globalPlaceCount");
  if (pSelect) {
    pSelect.value = 0;
    updateDropdownBackgrounds();
  }
  const wSelect = document.getElementById("globalWarning");
  if (wSelect) {
    wSelect.value = 0;
    updateDropdownBackgrounds();
  }
  const cSelect = document.getElementById("globalColorSelect");
  if (cSelect) {
    cSelect.value = "";
    cSelect.style.backgroundColor = "";
  }

  document.getElementById("forecastContent").innerHTML =
    '<p class="placeholder-text">कोई जिला चुने और मौसम घटनाएँ चुनें...</p>';
}

function handleMapUpdate(mode) {
  const modeForecast = document.getElementById("modeForecast");
  const modeWarning = document.getElementById("modeWarning");
  if (mode === "forecast") {
    if (modeForecast) modeForecast.checked = true;
    if (modeWarning) modeWarning.checked = false;
    weeklyData = weeklyForecastData; // Ensure we are updating the right data
  } else {
    if (modeForecast) modeForecast.checked = false;
    if (modeWarning) modeWarning.checked = true;
    weeklyData = weeklyWarningData; // Ensure we are updating the right data
  }
  updateMapWithPhenomena();
}

function loadSavedData() {
  const raw = localStorage.getItem("bihar_weather_data");
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      // Check if it's the new format with forecast/warning keys
      if (parsed.forecast && parsed.warning) {
        // Deserialize Forecast
        weeklyForecastData = parsed.forecast.map((day) => {
          const newDay = {};
          for (const [id, data] of Object.entries(day)) {
            newDay[id] = {
              phenomena: new Set(data.phenomena),
              color: data.color,
            };
          }
          return newDay;
        });
        // Deserialize Warning
        weeklyWarningData = parsed.warning.map((day) => {
          const newDay = {};
          for (const [id, data] of Object.entries(day)) {
            newDay[id] = {
              phenomena: new Set(data.phenomena),
              color: data.color,
            };
          }
          return newDay;
        });

        // Set initial active data
        const modeForecast = document.getElementById("modeForecast");
        if (modeForecast && modeForecast.checked) {
          weeklyData = weeklyForecastData;
        } else {
          weeklyData = weeklyWarningData;
        }
        districtPhenomenaMap = weeklyData[currentDay - 1];
        updateMapStyle();
        updateLegend();
      }
    } catch (e) {
      console.error("Failed to load saved data", e);
    }
  }
}

function updateMapWithPhenomena() {
  if (!selectedDistricts.length) {
    alert("कृपया कम से कम एक जिला चुनें।");
    return;
  }
  const activePhenomena = Array.from(
    document.querySelectorAll("#phenomenaContainer input:checked"),
  ).map((cb) => cb.value);

  if (!activePhenomena.length) {
    alert("कृपया कम से कम एक मौसम घटना चुनें।");
    return;
  }

  const selectedColor = document.getElementById("globalColorSelect").value;

  activeDays.forEach((dayNum) => {
    const dayData = weeklyData[dayNum - 1];
    selectedDistricts.forEach((id) => {
      if (!dayData[id]) {
        dayData[id] = { phenomena: new Set(), color: selectedColor || null };
      } else {
        // Update color if a new one is selected, otherwise keep existing
        if (selectedColor) dayData[id].color = selectedColor;
      }
      activePhenomena.forEach((p) => dayData[id].phenomena.add(p));
    });
  });

  updateMapStyle();
  saveData();
  updateLegend();
}

function copyCurrentDayToAll() {
  if (
    !confirm(
      `Are you sure you want to copy Day ${currentDay} data to all other days? This will overwrite existing data.`,
    )
  )
    return;

  const sourceData = weeklyData[currentDay - 1];

  for (let i = 0; i < 7; i++) {
    if (i === currentDay - 1) continue;
    const newDayData = {};
    // Deep copy the district map (Sets need to be cloned)
    for (const [distId, phenSet] of Object.entries(sourceData)) {
      newDayData[distId] = {
        phenomena: new Set(phenSet.phenomena),
        color: phenSet.color,
      };
    }
    weeklyData[i] = newDayData;
  }
  alert(`Day ${currentDay} data copied to all other days.`);
  saveData();
}

function openCopyModal() {
  const container = document.getElementById("copyDaysContainer");
  container.innerHTML = "";
  for (let i = 1; i <= 7; i++) {
    if (i === currentDay) continue; // Skip current day
    const div = document.createElement("label");
    div.className = "checkbox-container";
    div.innerHTML = `
        Day ${i}
        <input type="checkbox" value="${i}" class="copy-target-day">
        <span class="checkmark"></span>
    `;
    container.appendChild(div);
  }
  document.getElementById("copyModal").style.display = "flex";
}

function submitCopyDays() {
  const checkboxes = document.querySelectorAll(".copy-target-day:checked");
  if (checkboxes.length === 0) {
    alert("Please select at least one day.");
    return;
  }

  const sourceData = weeklyData[currentDay - 1];
  checkboxes.forEach((cb) => {
    const targetIndex = parseInt(cb.value) - 1;
    const newDayData = {};
    for (const [distId, phenSet] of Object.entries(sourceData)) {
      newDayData[distId] = {
        phenomena: new Set(phenSet.phenomena),
        color: phenSet.color,
      };
    }
    weeklyData[targetIndex] = newDayData;
  });

  alert(`Forecast copied to ${checkboxes.length} selected days.`);
  document.getElementById("copyModal").style.display = "none";
  saveData();
}

function saveData() {
  const serialize = (dataArr) =>
    dataArr.map((dayData) => {
      const newDay = {};
      for (const [id, set] of Object.entries(dayData)) {
        newDay[id] = {
          phenomena: Array.from(set.phenomena),
          color: set.color,
        };
      }
      return newDay;
    });

  const payload = {
    forecast: serialize(weeklyForecastData),
    warning: serialize(weeklyWarningData),
  };

  localStorage.setItem("bihar_weather_data", JSON.stringify(payload));
}

function handleUserLogoClick() {
  const isLoggedIn = document.body.classList.contains("logged-in");
  // Always toggle Dropdown
  const dropdown = document.getElementById("userDropdown");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
  renderUserMenu(isLoggedIn);
}

function closeLoginModal() {
  document.getElementById("loginModal").style.display = "none";
}

function submitLogin() {
  const id = document.getElementById("loginId").value;
  const pass = document.getElementById("loginPass").value;

  if (id === "admin" && pass === "Kamal@007") {
    // Success
    document.body.classList.add("logged-in");
    localStorage.setItem("admin_logged_in", "true");
    document.getElementById("userLogoBtn").classList.add("active-session");
    closeLoginModal();
    const btn = document.getElementById("btnToggleDrag");
    if (btn) btn.style.display = "inline-block";
    alert("Login Successful! Welcome Admin.");
  } else {
    // Fail
    document.getElementById("loginError").style.display = "block";
  }
}

function performLogout() {
  document.body.classList.remove("logged-in");
  localStorage.removeItem("admin_logged_in");
  document.getElementById("userLogoBtn").classList.remove("active-session");
  document.getElementById("userDropdown").style.display = "none";
  const btn = document.getElementById("btnToggleDrag");
  if (btn) {
    btn.style.display = "none";
    if (isLayoutEditMode) toggleLayoutEditMode();
  }
  alert("Logged Out Successfully.");
}

function renderUserMenu(isLoggedIn) {
  const dropdown = document.getElementById("userDropdown");
  let html = "";
  if (isLoggedIn) {
    html += `<a href="#" onclick="performLogout()" style="color: red;">Sign Out</a>`;
  } else {
    html += `<a href="#" onclick="openLoginModal()">Sign In</a>`;
  }
  dropdown.innerHTML =
    html +
    `
    <a href="#" onclick="showAbout()">About Bihar Weather Forecast System</a>
    <a href="#" onclick="showContact()">Contact Us</a>
  `;
}

function showAbout() {
  document.getElementById("userDropdown").style.display = "none";
  document.getElementById("aboutModal").style.display = "flex";
}

function showContact() {
  document.getElementById("userDropdown").style.display = "none";
  document.getElementById("contactModal").style.display = "flex";
}

function openLoginModal() {
  document.getElementById("userDropdown").style.display = "none";
  document.getElementById("loginModal").style.display = "flex";
  document.getElementById("loginError").style.display = "none";
  document.getElementById("loginId").value = "";
  document.getElementById("loginPass").value = "";
  // Reset password visibility
  const passInput = document.getElementById("loginPass");
  passInput.type = "password";
  const icon = document.getElementById("togglePassword");
  if (icon) {
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

function togglePasswordVisibility() {
  const passInput = document.getElementById("loginPass");
  const icon = document.getElementById("togglePassword");
  if (passInput.type === "password") {
    passInput.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    passInput.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

function shareApp() {
  if (navigator.share) {
    navigator
      .share({
        title: "Bihar Weather Forecast",
        text: "Check out the Bihar Weather Forecast System developed by Lal Kamal.",
        url: window.location.href,
      })
      .catch(console.error);
  } else {
    alert("Link copied to clipboard!");
    navigator.clipboard.writeText(window.location.href);
  }
}

// Close dropdown if clicked outside
window.onclick = function (event) {
  if (!event.target.matches(".user-logo")) {
    const dropdown = document.getElementById("userDropdown");
    if (dropdown && dropdown.style.display === "block") {
      dropdown.style.display = "none";
    }
  }
};

// ---------- Map & Shapefile ----------
let map, geojsonLayer, tileLayer, satelliteLayer, hybridLayer, mapDateControl;
let zoomControl = null;

function initMap() {
  // Initialize Leaflet Map
  // Default zoom disabled as requested
  map = L.map("map", {
    center: [25.6, 85.6],
    zoom: 7,
    zoomControl: false, // We will add it if enabled, or use custom
    scrollWheelZoom: false,
    doubleClickZoom: false,
    dragging: false,
    boxZoom: false,
  });

  // Base Layers
  tileLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 18,
      attribution: "© OpenStreetMap",
    },
  );

  satelliteLayer = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      maxZoom: 18,
      attribution: "Tiles &copy; Esri",
    },
  );

  hybridLayer = L.tileLayer(
    "http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}",
    { attribution: "Google", maxZoom: 20 },
  );

  // Add default layer
  tileLayer.addTo(map);

  phenomenaMarkersLayer = L.layerGroup().addTo(map);

  // Add Static Overlays (Logos & Arrow)
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
              <div id="mapDateOverlay" class="map-date-text" style="margin-top:2px; font-weight:bold; color:#000; background:rgba(255,255,255,0.8); padding:2px 5px; border-radius:4px; font-size:12px; box-shadow: 0 1px 3px rgba(0,0,0,0.2); white-space:nowrap;">Loading...</div>
          </div>
      </div>
      <div id="overlayRight" style="position:absolute; top:10px; right:10px; z-index:1001; display:flex; gap:10px; align-items:center; pointer-events:auto;">
          <img src="assets/IMD_150_Year_Logo.png" style="height:70px;">
          <img src="assets/North_Arrow.png" style="height:60px;">
      </div>
      <div id="mapLegend" class="info legend" style="position:absolute; bottom:30px; right:10px; z-index:1001; pointer-events:auto; display:none;"></div>
  `;

  updateMapDateHeader(); // Set initial date in new overlay
  updateLegend();
  loadLayoutPositions();

  // Layer Control (Hidden by default, toggled via UI buttons if needed, or we can add standard control)
  // We are using custom buttons for toggling, but let's add standard control for Satellite
  // L.control.layers({ "Street View": tileLayer, "Satellite View": satelliteLayer }).addTo(map);

  // Load Shapefile (Bihar.shp and Bihar.dbf)
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
      if (!r.ok) {
        console.warn("PRJ file not found. Map might not render correctly.");
        return null;
      }
      return r.text();
    }),
  ])
    .then(([shpBuffer, dbfBuffer, prjStr]) => {
      if (!prjStr) {
        alert(
          "Warning: Bihar.prj file missing. Map projection may be incorrect.",
        );
      }
      // Parse and combine SHP + DBF
      const geojson = shp.combine([
        shp.parseShp(shpBuffer, prjStr),
        shp.parseDbf(dbfBuffer),
      ]);

      // Add to Map
      geojsonLayer = L.geoJSON(geojson, {
        style: (feature) => {
          const oid = parseInt(feature.properties.OBJECTID);
          const isFoothill =
            showFoothill && subRegionDistricts.fh.includes(oid);
          return {
            fillColor: getDistrictRegionColor(oid),
            weight: 2,
            opacity: 1,
            color: "#333", // Dark border
            dashArray: isFoothill ? "5, 5" : "",
            fillOpacity: isFoothill ? 0.5 : 0.2,
          };
        },
        onEachFeature: (feature, layer) => {
          // Tooltip with District Name
          if (feature.properties && feature.properties.D_NAME) {
            layer.bindTooltip(feature.properties.D_NAME, {
              permanent: true,
              direction: "center",
              className: "map-label",
            });
          }

          layer.on({
            mouseover: (e) => {
              const layer = e.target;
              layer.setStyle({
                weight: 3,
                color: "#666",
                fillOpacity: 0.7,
              });
              layer.bringToFront();

              // Show phenomena in tooltip on hover
              if (layer.feature.properties.phenomenaText) {
                const originalContent = layer.feature.properties.D_NAME;
                const newContent = `${originalContent}<br><span style="font-size:0.9em; font-weight:normal; color:#333;">${layer.feature.properties.phenomenaText}</span>`;
                layer.setTooltipContent(newContent);
              }
            },
            mouseout: () => updateMapStyle(),
            click: () => {
              const oid = feature.properties.OBJECTID;
              toggleDistrictByMap(oid);
            },
          });
        },
      }).addTo(map);

      // Fit map to Bihar bounds
      map.fitBounds(geojsonLayer.getBounds());

      // Handle label visibility on zoom
      const toggleLabels = () => {
        const pane = document.querySelector(".leaflet-tooltip-pane");
        if (!pane) return;
        if (map.getZoom() < 8) pane.classList.add("labels-hidden");
        else pane.classList.remove("labels-hidden");
      };
      map.on("zoomend", toggleLabels);
      toggleLabels(); // Initial check
    })
    .catch((err) => {
      console.error("Error loading shapefile:", err);
      alert(
        "Map loading failed. Ensure you are using a Local Server and data files exist.\n" +
          err.message,
      );
    });
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
    if (geojsonLayer) map.fitBounds(geojsonLayer.getBounds());
  }
}

function toggleTiles(show) {
  if (show) {
    // Turn on Street, Turn off Satellite & Hybrid
    if (map.hasLayer(satelliteLayer)) map.removeLayer(satelliteLayer);
    if (map.hasLayer(hybridLayer)) map.removeLayer(hybridLayer);
    if (!map.hasLayer(tileLayer)) map.addLayer(tileLayer);
    document.getElementById("toggleSatelliteView").checked = false;
    document.getElementById("toggleHybridView").checked = false;
  } else {
    if (map.hasLayer(tileLayer)) map.removeLayer(tileLayer);
  }
}

function toggleSatellite(show) {
  if (show) {
    // Turn on Satellite, Turn off Street & Hybrid
    if (map.hasLayer(tileLayer)) map.removeLayer(tileLayer);
    if (map.hasLayer(hybridLayer)) map.removeLayer(hybridLayer);
    if (!map.hasLayer(satelliteLayer)) map.addLayer(satelliteLayer);
    document.getElementById("toggleStreetView").checked = false;
    document.getElementById("toggleHybridView").checked = false;
  } else {
    if (map.hasLayer(satelliteLayer)) map.removeLayer(satelliteLayer);
  }
}

function toggleHybrid(show) {
  if (show) {
    // Turn on Hybrid, Turn off Street & Satellite
    if (map.hasLayer(tileLayer)) map.removeLayer(tileLayer);
    if (map.hasLayer(satelliteLayer)) map.removeLayer(satelliteLayer);
    if (!map.hasLayer(hybridLayer)) map.addLayer(hybridLayer);
    document.getElementById("toggleStreetView").checked = false;
    document.getElementById("toggleSatelliteView").checked = false;
  } else {
    if (map.hasLayer(hybridLayer)) map.removeLayer(hybridLayer);
  }
}

function toggleDistrictByMap(oid) {
  // Find the checkbox corresponding to the Shapefile OBJECTID
  const cb = document.querySelector(`#districtGrid input[value="${oid}"]`);
  if (cb) {
    cb.checked = !cb.checked;
    // Update selection logic
    updateMultipleSelection();
  }
}

function updateMapStyle(skipMarkers = false) {
  if (!geojsonLayer) return;

  if (!skipMarkers && phenomenaMarkersLayer) {
    phenomenaMarkersLayer.clearLayers();
  }

  // If no review mode is active, we only show the current selection highlight, not the saved weather data
  const showWeatherData = currentReviewMode !== null;

  // If we are not showing weather data, we shouldn't show the legend either (or show empty)
  if (!showWeatherData) {
    /* Logic handled in updateLegend mostly, but map needs to be clean */
  }

  geojsonLayer.eachLayer((layer) => {
    const oid = String(layer.feature.properties.OBJECTID);

    // Check for phenomena specific color
    let phenomColor = null;
    let assignedPhenomenaList = [];

    const distData = showWeatherData ? districtPhenomenaMap[oid] : null;

    if (
      showWeatherData &&
      distData &&
      distData.phenomena &&
      distData.phenomena.size > 0
    ) {
      // Find highest priority color based on phenDefs order
      for (const pDef of phenDefs) {
        if (distData.phenomena.has(pDef.id)) {
          if (!phenomColor) phenomColor = phenColors[pDef.id];
          assignedPhenomenaList.push(pDef);
        }
      }
    }

    // Marker and Text Logic
    // Only show markers if we are showing weather data
    if (!skipMarkers && showWeatherData) {
      if (assignedPhenomenaList.length > 0) {
        layer.feature.properties.phenomenaText = assignedPhenomenaList
          .map((p) => p.hindi)
          .join(", ");

        // Generate HTML for multiple icons
        let iconsHtml = "";
        // If multiple, use smaller size
        const iconSize = assignedPhenomenaList.length > 1 ? "18px" : "32px";

        assignedPhenomenaList.forEach((p) => {
          iconsHtml += `<div style="font-size: ${iconSize}; color: ${phenColors[p.id]}; text-shadow: 0 0 3px #fff; margin: 1px;">
                            <i class="fas ${p.icon} phenom-anim-${p.id}"></i>
                          </div>`;
        });

        const icon = L.divIcon({
          html: iconsHtml,
          className: "map-phenom-marker",
          iconSize: [40, 40], // Container size
          iconAnchor: [20, 20],
        });
        // Calculate center of polygon
        const center = layer.getBounds().getCenter();
        const marker = L.marker(center, {
          icon: icon,
          interactive: true,
        }).addTo(phenomenaMarkersLayer);

        const popupContent = `
          <div style="text-align: center; min-width: 150px;">
            <h4 style="margin: 0 0 8px 0; border-bottom: 1px solid #eee; padding-bottom: 5px;">
              ${layer.feature.properties.D_NAME}
            </h4>
            ${assignedPhenomenaList
              .map(
                (p) => `
              <div style="margin-bottom: 6px; line-height: 1.2;">
                <strong style="color: ${phenColors[p.id]}">
                  <i class="fas ${p.icon}"></i> ${p.hindi}
                </strong><br>
                <small style="color: #555;">${p.english}</small>
              </div>
            `,
              )
              .join("")}
          </div>
        `;

        marker.bindPopup(popupContent);
      } else {
        delete layer.feature.properties.phenomenaText;
      }
    }

    if (
      showWeatherData &&
      distData &&
      (distData.phenomena.size > 0 || distData.color)
    ) {
      // Use stored color if available, else fallback to phenom color
      layer.setStyle({
        fillColor: distData.color || phenomColor || "#667eea",
        fillOpacity: 0.8,
        color: "#333",
        weight: 2,
        dashArray: "",
      });
    } else if (selectedDistricts.includes(oid)) {
      // Highlight selected
      layer.setStyle({
        fillColor: "#667eea",
        fillOpacity: 0.6,
        color: "#2c3e50",
        weight: 2,
        dashArray: "",
      });
    } else {
      // Default style
      const isFoothill =
        showFoothill && subRegionDistricts.fh.includes(parseInt(oid));
      layer.setStyle({
        fillColor: getDistrictRegionColor(oid),
        fillOpacity: isFoothill ? 0.5 : 0.2,
        color: "#333", // Dark border
        weight: 2,
        dashArray: isFoothill ? "5, 5" : "",
      });
    }
  });
}

function updateLegend() {
  const legendDiv = document.getElementById("mapLegend");
  const showLegend = document.getElementById("toggleLegend")?.checked;

  if (!legendDiv || currentReviewMode === null) {
    if (legendDiv) legendDiv.style.display = "none";
    return;
  }

  if (!showLegend) {
    legendDiv.style.display = "none";
    return;
  }
  legendDiv.style.display = "block";
  legendDiv.innerHTML = "";

  const activePhenomena = new Set();

  // Collect active phenomena from checkboxes
  document
    .querySelectorAll("#phenomenaContainer input:checked")
    .forEach((cb) => {
      activePhenomena.add(cb.value);
    });
  // Also from map data if any
  if (districtPhenomenaMap) {
    Object.values(districtPhenomenaMap).forEach((d) => {
      if (d.phenomena) {
        d.phenomena.forEach((p) => activePhenomena.add(p));
      }
    });
  }

  // 1. Render Phenomena (First)
  if (activePhenomena.size > 0) {
    legendDiv.innerHTML += `<div style="margin: 5px 0 2px 0; font-weight:bold; border-bottom:1px solid #ccc;">PHENOMENA</div>`;
    phenDefs.forEach((p) => {
      if (activePhenomena.has(p.id)) {
        const color = phenColors[p.id];
        legendDiv.innerHTML += `
          <div style="display:flex; align-items:center; margin-bottom:6px;">
            <div style="width:35px; text-align:center; margin-right:8px;">
                <i class="fas ${p.icon}" style="color:${color}; font-size:24px;"></i>
            </div>
            <div style="line-height:1.2;">
                <span style="font-weight:bold;">${p.english}</span><br>
                <span style="font-size:0.9em; color:#555;">${p.hindi}</span>
            </div>
          </div>`;
      }
    });
  }

  // 2. Render Forecast OR Warning based on mode
  let showForecast = true;
  if (currentReviewMode) {
    showForecast = currentReviewMode === "forecast";
  } else {
    const modeForecast = document.getElementById("modeForecast");
    if (modeForecast) showForecast = modeForecast.checked;
  }

  if (showForecast) {
    legendDiv.innerHTML += `<div style="margin: 10px 0 5px 0; font-weight:bold; border-bottom:1px solid #ccc;">Forecast: Distribution</div>`;
    forecastLegendItems.forEach((item) => {
      const borderStyle = item.border ? `border:${item.border};` : "";
      legendDiv.innerHTML += `
        <div style="display:flex; align-items:center; margin-bottom:6px; line-height:1.2;">
          <span style="width:20px; height:20px; background:${item.color}; ${borderStyle} margin-right:8px; flex-shrink:0;"></span>
          <span style="font-size:0.9em;">${item.text}</span>
        </div>`;
    });
  } else {
    legendDiv.innerHTML += `<div style="margin: 10px 0 5px 0; font-weight:bold; border-bottom:1px solid #ccc;">Warning</div>`;
    warningLegendItems.forEach((item) => {
      legendDiv.innerHTML += `
        <div style="display:flex; align-items:center; margin-bottom:6px; line-height:1.2; text-align:left;">
          <span style="width:20px; height:20px; background:${item.color}; border:1px solid #999; margin-right:8px; flex-shrink:0;"></span>
          <span style="font-size:0.9em;">${item.text}</span>
        </div>`;
    });
  }

  if (legendDiv.innerHTML === "") {
    legendDiv.innerHTML = "<em>No items selected</em>";
  }
}

function getDistrictRegionColor(id) {
  id = parseInt(id);
  // Colors for 6 sub-regions
  if (subRegionDistricts.nw.includes(id)) return "#00897b"; // North West (Teal)
  if (subRegionDistricts.nc.includes(id)) return "#1976d2"; // North Central (Blue)
  if (subRegionDistricts.ne.includes(id)) return "#673ab7"; // North East (Deep Purple)
  if (subRegionDistricts.sw.includes(id)) return "#f44336"; // South West (Red)
  if (subRegionDistricts.sc.includes(id)) return "#fbc02d"; // South Central (Yellow)
  if (subRegionDistricts.se.includes(id)) return "#795548"; // South East (Brown)
  return "#3388ff"; // Fallback
}

function validateDistrictCoverage() {
  const allIds = districtsData.map((d) => d.id);
  const coveredIds = new Set();

  Object.values(regionalGroups).forEach((g) => {
    g.districts.forEach((id) => coveredIds.add(id));
  });

  const missing = allIds.filter((id) => !coveredIds.has(id));

  if (missing.length > 0) {
    const names = missing
      .map((id) => {
        const d = getDistrictNameById(id);
        return d ? `${d.name} (${d.hindi})` : `ID: ${id}`;
      })
      .join(", ");
    console.error("Validation Error: Missing districts:", names);
    alert(
      `Configuration Error:\nThe following districts are not assigned to any regional group:\n${names}`,
    );
  }
}

function updateDateTime() {
  const now = new Date();

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const timeOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit" };

  const dateStr = now.toLocaleDateString("hi-IN", dateOptions);
  const timeStr = now.toLocaleTimeString("hi-IN", timeOptions);

  const h = now.getHours();
  let icon = "fa-moon";
  let iconStyle = "";

  if (h >= 6 && h < 18) {
    icon = "fa-sun";
    iconStyle = "color: #e67e22;"; // Orange for sun
  }

  document.getElementById("currentDateTime").innerHTML =
    `<div><i class="fas ${icon}" style="margin-right:8px; ${iconStyle}"></i>${dateStr}</div>
     <div>${timeStr}</div>`;
}

function fetchTemperature() {
  // Patna coordinates (Capital of Bihar)
  const lat = 25.61;
  const lon = 85.14;
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.current_weather) {
        const temp = data.current_weather.temperature;
        document.getElementById("currentTemp").innerHTML =
          `<i class="fas fa-temperature-high" style="margin-right:8px; color:#e74c3c;"></i>Patna: ${temp}°C`;
      }
    })
    .catch((err) => console.error("Weather fetch error:", err));
}

function initVisitorCounter() {
  let count = localStorage.getItem("page_views");
  if (!count) {
    count = 1117; // Start with base number
  } else {
    count = parseInt(count) + 1;
  }
  localStorage.setItem("page_views", count);
  const el = document.getElementById("visitorCount");
  if (el) {
    // Speedometer rolling effect
    const duration = 2000; // 2 seconds
    const start = 0;
    const end = count;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Ease-out function
      const easeOut = 1 - Math.pow(1 - progress, 3);

      el.innerText = Math.floor(easeOut * (end - start) + start);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        el.innerText = end;
        el.classList.add("blink-active");
      }
    }
    requestAnimationFrame(animation);
  }
}

function toggleMapRegion(regionCode, isChecked) {
  let districts = subRegionDistricts[regionCode];

  if (!districts && regionalGroups[regionCode]) {
    districts = regionalGroups[regionCode].districts;
  }

  if (!districts) return;

  districts.forEach((id) => {
    const cb = document.querySelector(`#districtGrid input[value="${id}"]`);
    if (cb) {
      cb.checked = isChecked;
      const parent = cb.closest(".district-checkbox");
      if (isChecked) parent.classList.add("highlighted");
      else parent.classList.remove("highlighted");
    }
  });

  updateMultipleSelection();
}

function switchDay(day) {
  const isMulti = document.getElementById("multiDaySelectToggle")?.checked;

  if (isMulti) {
    if (activeDays.has(day)) {
      if (activeDays.size > 1) activeDays.delete(day);
    } else {
      activeDays.add(day);
    }
    currentDay = day; // Focus view on the clicked day
  } else {
    activeDays.clear();
    activeDays.add(day);
    currentDay = day;
  }

  districtPhenomenaMap = weeklyData[currentDay - 1];

  // Auto-clear legend/UI if day has no data
  if (!districtPhenomenaMap || Object.keys(districtPhenomenaMap).length === 0) {
    resetUI();
  }

  // Update UI tabs
  // Fix: Target specific day buttons instead of relying on index
  for (let i = 1; i <= 7; i++) {
    const btn = document.querySelector(`button[onclick="switchDay(${i})"]`);
    if (btn) {
      if (activeDays.has(i)) btn.classList.add("active");
      else btn.classList.remove("active");
    }
  }

  updateMapDateHeader();
  updateMapHeaderText(); // Update the specific text
  updateMapStyle();
  updateLegend();
}

function updateMapDateHeader() {
  const el = document.getElementById("mapDateOverlay");
  if (el) {
    const date = new Date();
    // If reviewing a specific day, we might want to show that day's date,
    // but request says "Date: 23-01-2026" (Current Date usually, or selected day date).
    // Assuming selected day date based on context of "Day 1", "Day 2" selection.
    date.setDate(date.getDate() + (currentDay - 1));

    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const dateStr = date
      .toLocaleDateString("en-IN", options)
      .replace(/\//g, "-");

    el.innerHTML = `Date: ${dateStr}`;
  }
}

// Helper to compare two day data objects for equality
function areDaysEqual(d1, d2) {
  if (!d1 || !d2) return false;
  const keys1 = Object.keys(d1);
  const keys2 = Object.keys(d2);
  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    const val1 = d1[key];
    const val2 = d2[key];
    if (!val2) return false;
    if (val1.color !== val2.color) return false;
    if (val1.phenomena.size !== val2.phenomena.size) return false;
    const p1 = Array.from(val1.phenomena).sort();
    const p2 = Array.from(val2.phenomena).sort();
    if (JSON.stringify(p1) !== JSON.stringify(p2)) return false;
  }
  return true;
}

function updateMapHeaderText() {
  const el = document.getElementById("mapHeaderText");
  if (!el) return;

  // Only update text if visible (active review mode)
  if (currentReviewMode === null) {
    el.style.display = "none";
    return;
  } else {
    el.style.display = "block";
  }

  // Calculate Continuous Range
  let startDay = currentDay;
  let endDay = currentDay;

  // Check backwards
  while (
    startDay > 1 &&
    areDaysEqual(weeklyData[startDay - 1 - 1], weeklyData[startDay - 1])
  ) {
    startDay--;
  }
  // Check forwards
  while (
    endDay < 7 &&
    areDaysEqual(weeklyData[endDay - 1], weeklyData[endDay])
  ) {
    endDay++;
  }

  const date = new Date();
  // Start Date for Range Start
  const startDate = new Date(date);
  startDate.setDate(date.getDate() + (startDay - 1));

  // End Date for Range End
  const endDate = new Date(date);
  endDate.setDate(date.getDate() + endDay); // +1 day logic is handled by using endDay directly (since currentDay is 0-based index + 1)
  // Wait, logic check:
  // Day 1: Date + 0. Valid till Date + 1.
  // If Range is Day 1 to Day 1: Start = Date+0, End = Date+1.
  // If Range is Day 1 to Day 2: Start = Date+0, End = Date+2.
  // So endDate calculation:
  // endDate.setDate(date.getDate() + endDay);
  // Correct.

  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const startStr = startDate
    .toLocaleDateString("en-IN", options)
    .replace(/\//g, ".");
  const endStr = endDate
    .toLocaleDateString("en-IN", options)
    .replace(/\//g, ".");

  const modeText =
    currentReviewMode === "forecast"
      ? "वर्षा का पूर्वानुमान"
      : "मौसम की चेतावनी";
  const modeColor = currentReviewMode === "forecast" ? "#0056b3" : "#c0392b"; // Blue / Red

  let dayText = "";
  if (startDay === endDay) {
    dayText = `दिन - ${startDay}`;
  } else {
    dayText = `दिन ${startDay} से दिन - ${endDay}`;
  }

  // Logic for text: Day 1
  // (23.01.2025 के 0830 IST से 24.01.2025 के 0830 IST तक मान्य)

  el.innerHTML = `
        <div>
            <div style="text-align:center; color:${modeColor}; font-weight:bold; font-size:1.2em; margin-bottom:5px; white-space:nowrap;">
                ${modeText} ${dayText} के लिए
            </div>
            <div style="text-align:center; font-size:1em; color:#333;">
                (${startStr} के 0830 IST से ${endStr} के 0830 IST तक मान्य)
            </div>
        </div>
    `;
}

// Ensure Review Buttons are inactive on load
document.addEventListener("DOMContentLoaded", () => {
  const btnF = document.getElementById("btnReviewForecast");
  const btnW = document.getElementById("btnReviewWarning");
  if (btnF) {
    btnF.style.background = "";
    btnF.style.color = "#333";
  }
  if (btnW) {
    btnW.style.background = "";
    btnW.style.color = "#333";
  }
  currentReviewMode = null;
  const headerText = document.getElementById("mapHeaderText");
  if (headerText) headerText.style.display = "none";
});

function toggleLayoutEditMode() {
  isLayoutEditMode = !isLayoutEditMode;
  const btn = document.getElementById("btnToggleDrag");

  if (isLayoutEditMode) {
    btn.innerText = "Save Layout";
    btn.style.background = "#27ae60";
    alert(
      "Layout Edit Mode Enabled.\n- Drag elements to reposition.\n- Use Mouse Wheel to resize elements.",
    );
    enableDrag("overlayLeft");
    enableDrag("overlayRight");
    enableDrag("mapLegend");
    enableDrag("mapHeaderText");
  } else {
    btn.innerText = "Enable Layout Edit";
    btn.style.background = "#8e44ad";
    saveLayoutPositions();
    alert("Layout Saved.");
  }
}

function enableDrag(selector) {
  const el = selector.startsWith(".")
    ? document.querySelector(selector)
    : document.getElementById(selector);
  if (!el) return;

  el.style.cursor = isLayoutEditMode ? "move" : "default";

  el.onmousedown = function (e) {
    if (!isLayoutEditMode) return;
    e.preventDefault();

    let startX = e.clientX;
    let startY = e.clientY;

    // Convert right/bottom to left/top for consistent dragging
    if (el.style.right && el.style.right !== "auto") {
      el.style.left = el.offsetLeft + "px";
      el.style.right = "auto";
    }
    if (el.style.bottom && el.style.bottom !== "auto") {
      el.style.top = el.offsetTop + "px";
      el.style.bottom = "auto";
    }

    document.onmousemove = function (e) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      el.style.top = el.offsetTop + dy + "px";
      el.style.left = el.offsetLeft + dx + "px";
      startX = e.clientX;
      startY = e.clientY;
    };

    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };

  // Enable resizing via mouse wheel
  el.onwheel = function (e) {
    if (!isLayoutEditMode) return;
    e.preventDefault();
    let scale = parseFloat(el.getAttribute("data-scale")) || 1;
    if (e.deltaY < 0) scale += 0.1;
    else scale -= 0.1;
    scale = Math.min(Math.max(0.5, scale), 3); // Limit scale between 0.5x and 3x
    el.style.transform = `scale(${scale})`;
    el.setAttribute("data-scale", scale.toFixed(2));
  };
}

function saveLayoutPositions() {
  const layout = {};
  const ids = ["overlayLeft", "overlayRight", "mapLegend", "mapHeaderText"];
  ids.forEach((id) => {
    const el = id.startsWith(".")
      ? document.querySelector(id)
      : document.getElementById(id);
    if (el) {
      layout[id] = {
        top: el.style.top,
        left: el.style.left,
        right: el.style.right,
        bottom: el.style.bottom,
        position: el.style.position,
        zIndex: el.style.zIndex,
        scale: el.getAttribute("data-scale"),
      };
    }
  });
  localStorage.setItem("bihar_map_layout", JSON.stringify(layout));
}

function loadLayoutPositions() {
  const raw = localStorage.getItem("bihar_map_layout");
  if (!raw) return;
  try {
    const layout = JSON.parse(raw);
    for (const [id, style] of Object.entries(layout)) {
      const el = id.startsWith(".")
        ? document.querySelector(id)
        : document.getElementById(id);
      if (el) {
        if (style.top) el.style.top = style.top;
        if (style.left) el.style.left = style.left;
        if (style.right) el.style.right = style.right;
        if (style.bottom) el.style.bottom = style.bottom;
        if (style.position) el.style.position = style.position;
        if (style.zIndex) el.style.zIndex = style.zIndex;
        if (style.scale) {
          el.style.transform = `scale(${style.scale})`;
          el.setAttribute("data-scale", style.scale);
        }
      }
    }
  } catch (e) {
    console.error("Error loading layout", e);
  }
}

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

// ---------- Globals ----------
let selectedDistricts = [],
  selectedPhenomena = [],
  showFoothill = true,
  currentDay = 1,
  weeklyData = Array(7)
    .fill(null)
    .map(() => ({})),
  districtPhenomenaMap = weeklyData[0],
  phenomenaMarkersLayer;

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
  attachHandlers();
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    document.getElementById("darkModeToggle").innerHTML =
      '<i class="fas fa-sun"></i>';
    document.getElementById("darkModeToggle").title = "Light Mode";
  }
  initMap();
  validateDistrictCoverage();
  updateDateTime();
  setInterval(updateDateTime, 1000);
  fetchTemperature();
  setInterval(fetchTemperature, 900000); // 15 minutes
  initVisitorCounter();
});

// ---------- UI builders ----------
function buildRegionalGrid() {
  const box = document.getElementById("regionalGrid");
  Object.entries(regionalGroups).forEach(([key, g]) => {
    const lbl = document.createElement("label");
    lbl.className = `regional-checkbox region-${key}`;
    lbl.innerHTML = `<input type="checkbox" value="${key}" onchange="handleRegionChange(this)">
                   <span>${g.name} – ${g.english}</span>`;
    box.appendChild(lbl);
  });
}
function buildMultipleDistrictGrid() {
  const grid = document.getElementById("districtGrid");
  districtsData.forEach((d) => {
    const lbl = document.createElement("label");
    lbl.className = "district-checkbox";
    lbl.innerHTML = `<input type="checkbox" value="${d.id}" onchange="updateMultipleSelection()">
                   <span>${d.hindi} (${d.name})</span>`;
    grid.appendChild(lbl);
  });
}
function buildPhenomenaPanel() {
  const box = document.getElementById("phenomenaContainer");
  phenDefs.forEach((d) => {
    const row = document.createElement("div");
    row.className = "phenomenon-row";
    row.style.borderLeft = `5px solid ${phenColors[d.id]}`; // यूनिक बॉर्डर
    row.innerHTML = `
      <input class="main-check same-size" type="checkbox" value="${
        d.id
      }" onchange="togglePhenom('${d.id}')">
      <div class="phenom-icon"><i class="fas ${d.icon} phenom-anim-${
      d.id
    }"></i></div>
      <label><strong>${d.hindi}</strong><br><small>${d.english}</small></label>
      <select class="sub-select intensity-select same-size" id="intensity-${
        d.id
      }">
        ${d.sub.map((s, i) => `<option value="${i}">${s}</option>`).join("")}
      </select>`;
    box.appendChild(row);
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
  document.getElementById("backToTop").onclick = scrollToTop;
  document.getElementById("toggleFoothill").onchange = (e) => {
    showFoothill = e.target.checked;
    updateMapStyle();
  };
  document.getElementById("updateMapPhenomena").onclick =
    updateMapWithPhenomena;
  document.getElementById("clearMapSelection").onclick = clearDistrictSelection;
  document.getElementById("downloadMap").onclick = downloadMapImage;
  document.getElementById("download7Days").onclick = downloadAllMaps;
  document.getElementById("download7DaysPDF").onclick = download7DaysPDF;
  document.getElementById("toggleStreetView").onchange = (e) => {
    toggleTiles(e.target.checked);
  };
  document.getElementById("toggleSatelliteView").onchange = (e) => {
    toggleSatellite(e.target.checked);
  };
  document.getElementById("copyDayData").onclick = copyCurrentDayToAll;
  document.getElementById("copyDayDataSelect").onclick = openCopyModal;
  document.querySelectorAll(".map-region-check").forEach((cb) => {
    cb.onchange = (e) => toggleMapRegion(e.target.value, e.target.checked);
  });
  document.getElementById("openDisplayHeader").onclick = () => {
    window.open("display.html", "_blank");
  };
  document.getElementById("userLogoBtn").onclick = handleUserLogoClick;
}
function updateMultipleSelection() {
  selectedDistricts = Array.from(
    document.querySelectorAll("#districtGrid input:checked")
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
    document.querySelectorAll("#regionalGrid input:checked")
  ).map((cb) => cb.value);
  const regionDistricts = new Set();

  checkedRegions.forEach((key) => {
    if (regionalGroups[key]) {
      regionalGroups[key].districts.forEach((d) =>
        regionDistricts.add(String(d))
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
function togglePhenom(id) {} // placeholder

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
          `intensity-${phenom}`
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
  const hindiNames = list.map((x) => x.district.hindi);
  const engNames = list.map((x) => x.district.name);
  const hindiStr =
    hindiNames.length === 1
      ? hindiNames[0]
      : hindiNames.length === 2
      ? `${hindiNames[0]} और ${hindiNames[1]}`
      : `${hindiNames.slice(0, -1).join(", ")} और ${
          hindiNames[hindiNames.length - 1]
        }`;
  const engStr =
    engNames.length === 1
      ? engNames[0]
      : engNames.length === 2
      ? `${engNames[0]} and ${engNames[1]}`
      : `${engNames.slice(0, -1).join(", ")} and ${
          engNames[engNames.length - 1]
        }`;

  // ---------- intensity lines (Scripts.xlsx order) ----------
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

  let html = "";
  selectedPhenomena.forEach((p) => {
    const color = phenColors[p.phenom];
    const placeMap = {
      1: "एक या दो स्थानों पर",
      2: "कुछ स्थानों",
      3: "अनेक स्थानों पर",
      4: "अधिकांश स्थानों पर",
    };
    const placeEng = {
      1: "at one or two places",
      2: "at a few places",
      3: "at many places",
      4: "at most places",
    };

    // सिर्फ़ चुनी हुई intensity
    const intensitySentenceHi = intensityLines[p.phenom][p.intensity];
    const intensitySentenceEn = intensityLinesEn[p.phenom][p.intensity];

    const placePhraseHi = placeMap[p.place];
    const placePhraseEn = placeEng[p.place];

    const phenomNames = {
      thunderstorm: {
        hindi: "मेघगर्जन/वज्रपात",
        english: "Thunderstorm/Lightning",
      },
      gustywind: { hindi: "तेज़ हवा", english: "Gusty Wind" },
      heatwave: { hindi: "लू (उष्ण लहर)", english: "Heat Wave" },
      hailstorm: { hindi: "ओलावृष्टि", english: "Hailstorm" },
      heavyrain: { hindi: "भारी वर्षा", english: "Heavy Rainfall" },
      densefog: { hindi: "घना कोहरा", english: "Dense Fog" },
      coldday: { hindi: "शीत दिवस", english: "Cold Day" },
      warmnight: { hindi: "गर्म रात्रि", english: "Warm Night" },
    };
    const phenH = phenomNames[p.phenom].hindi;
    const phenE = phenomNames[p.phenom].english;

    const hindiFinal = `${hindiStr} जिलों के ${placePhraseHi} ${intensitySentenceHi}`;
    const engFinal = `${intensitySentenceEn} ${placePhraseEn} over ${engStr} districts.`;

    html += `<div class="forecast-item" style="background:${color}20; border-left:5px solid ${color};">
               <strong>${phenH}</strong><br><small>${phenE}</small>
               <p style="margin-top:10px;font-size:1.05em">${hindiFinal}</p>
               <p style="font-style:italic;margin-top:6px">${engFinal}</p>
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
      "hi-IN"
    )}</p>${html}</body></html>`
  );
  win.document.close();
  win.print();
}
function downloadMapImage() {
  const node = document.getElementById("map");
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
    });
}
async function downloadAllMaps() {
  const originalDay = currentDay;
  const today = new Date().toISOString().split("T")[0];
  const overlay = document.getElementById("loadingOverlay");

  if (overlay) {
    overlay.style.display = "flex";
    overlay.querySelector("p").innerText = "Downloading 7 Days Maps...";
  }

  for (let i = 1; i <= 7; i++) {
    switchDay(i);
    // Wait for map update and render
    await new Promise((r) => setTimeout(r, 800));

    const node = document.getElementById("map");
    try {
      const dataUrl = await domtoimage.toPng(node, {
        width: node.offsetWidth,
        height: node.offsetHeight,
      });
      const link = document.createElement("a");
      link.download = `${today}-Day-${i}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error(`Error downloading Day ${i}:`, e);
    }
  }

  switchDay(originalDay);
  if (overlay) {
    overlay.style.display = "none";
    overlay.querySelector("p").innerText =
      "पूर्वानुमान तैयार किया जा रहा है... / Generating Forecast...";
  }
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
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---------- Clear ----------
function clearSelection() {
  selectedDistricts = [];
  selectedPhenomena = [];
  weeklyData[currentDay - 1] = {};
  districtPhenomenaMap = weeklyData[currentDay - 1];
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
}

function updateMapWithPhenomena() {
  if (!selectedDistricts.length) {
    alert("कृपया कम से कम एक जिला चुनें।");
    return;
  }
  const activePhenomena = Array.from(
    document.querySelectorAll("#phenomenaContainer input:checked")
  ).map((cb) => cb.value);

  if (!activePhenomena.length) {
    alert("कृपया कम से कम एक मौसम घटना चुनें।");
    return;
  }

  selectedDistricts.forEach((id) => {
    if (!districtPhenomenaMap[id]) {
      districtPhenomenaMap[id] = new Set();
    }
    activePhenomena.forEach((p) => districtPhenomenaMap[id].add(p));
  });

  updateMapStyle();
  saveData();
}

function copyCurrentDayToAll() {
  if (
    !confirm(
      `Are you sure you want to copy Day ${currentDay} data to all other days? This will overwrite existing data.`
    )
  )
    return;

  const sourceData = weeklyData[currentDay - 1];

  for (let i = 0; i < 7; i++) {
    if (i === currentDay - 1) continue;
    const newDayData = {};
    // Deep copy the district map (Sets need to be cloned)
    for (const [distId, phenSet] of Object.entries(sourceData)) {
      newDayData[distId] = new Set(phenSet);
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
    const div = document.createElement("div");
    div.className = "checkbox-container";
    div.innerHTML = `
        <label style="display:flex; align-items:center; cursor:pointer;">
            <input type="checkbox" value="${i}" class="copy-target-day" style="width:18px; height:18px; margin-right:8px;">
            Day ${i}
        </label>
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
      newDayData[distId] = new Set(phenSet);
    }
    weeklyData[targetIndex] = newDayData;
  });

  alert(`Forecast copied to ${checkboxes.length} selected days.`);
  document.getElementById("copyModal").style.display = "none";
  saveData();
}

function saveData() {
  // Convert Sets to Arrays for JSON serialization
  const serializableData = weeklyData.map((dayData) => {
    const newDay = {};
    for (const [id, set] of Object.entries(dayData)) {
      newDay[id] = Array.from(set);
    }
    return newDay;
  });
  localStorage.setItem("bihar_weather_data", JSON.stringify(serializableData));
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
    document.getElementById("userLogoBtn").classList.add("active-session");
    closeLoginModal();
    alert("Login Successful! Welcome Admin.");
  } else {
    // Fail
    document.getElementById("loginError").style.display = "block";
  }
}

function performLogout() {
  document.body.classList.remove("logged-in");
  document.getElementById("userLogoBtn").classList.remove("active-session");
  document.getElementById("userDropdown").style.display = "none";
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
let map, geojsonLayer, tileLayer, satelliteLayer, mapDateControl;

function initMap() {
  // Initialize Leaflet Map
  map = L.map("map").setView([25.6, 85.6], 7); // Center on Bihar

  // Base Layers
  tileLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 18,
      attribution: "© OpenStreetMap",
    }
  );

  satelliteLayer = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      maxZoom: 18,
      attribution: "Tiles &copy; Esri",
    }
  );

  // Add default layer
  tileLayer.addTo(map);

  phenomenaMarkersLayer = L.layerGroup().addTo(map);

  // Add Legend
  const legend = L.control({ position: "bottomright" });
  legend.onAdd = function () {
    const div = L.DomUtil.create("div", "info legend");
    const items = [
      { label: "चयनित (Selected)", color: "#667eea" },
      { label: "उत्तर-पश्चिम (NW)", color: "#00897b" },
      { label: "उत्तर-मध्य (NC)", color: "#1976d2" },
      { label: "उत्तर-पूर्व (NE)", color: "#673ab7" },
      { label: "दक्षिण-पश्चिम (SW)", color: "#f44336" },
      { label: "दक्षिण-मध्य (SC)", color: "#fbc02d" },
      { label: "दक्षिण-पूर्व (SE)", color: "#795548" },
      { label: "मेघगर्जन (Thunderstorm)", color: "#ffc107" },
      { label: "तेज़ हवा (Gusty Wind)", color: "#17a2b8" },
      { label: "लू (Heat Wave)", color: "#fd7e14" },
      { label: "ओलावृष्टि (Hailstorm)", color: "#6f42c1" },
      { label: "भारी वर्षा (Heavy Rain)", color: "#007bff" },
      { label: "घना कोहरा (Dense Fog)", color: "#6c757d" },
      { label: "शीत दिवस (Cold Day)", color: "#20c997" },
      { label: "गर्म रात्रि (Warm Night)", color: "#e83e8c" },
    ];
    items.forEach((item) => {
      div.innerHTML +=
        '<i style="background:' + item.color + '"></i> ' + item.label + "<br>";
    });
    return div;
  };
  legend.addTo(map);

  // Add Date Control
  const DateControl = L.Control.extend({
    onAdd: function (map) {
      const div = L.DomUtil.create("div", "map-date-control");
      div.id = "mapDateDisplay";
      div.innerHTML = "Loading Date...";
      return div;
    },
    onRemove: function (map) {},
  });
  mapDateControl = new DateControl({ position: "topright" });
  mapDateControl.addTo(map);
  updateMapDateHeader(); // Initial set

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
          "Warning: Bihar.prj file missing. Map projection may be incorrect."
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
          err.message
      );
    });
}

function toggleTiles(show) {
  if (show) {
    // Turn on Street, Turn off Satellite
    if (map.hasLayer(satelliteLayer)) map.removeLayer(satelliteLayer);
    if (!map.hasLayer(tileLayer)) map.addLayer(tileLayer);
    document.getElementById("toggleSatelliteView").checked = false;
  } else {
    if (map.hasLayer(tileLayer)) map.removeLayer(tileLayer);
  }
}

function toggleSatellite(show) {
  if (show) {
    // Turn on Satellite, Turn off Street
    if (map.hasLayer(tileLayer)) map.removeLayer(tileLayer);
    if (!map.hasLayer(satelliteLayer)) map.addLayer(satelliteLayer);
    document.getElementById("toggleStreetView").checked = false;
  } else {
    if (map.hasLayer(satelliteLayer)) map.removeLayer(satelliteLayer);
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

  geojsonLayer.eachLayer((layer) => {
    const oid = String(layer.feature.properties.OBJECTID);

    // Check for phenomena specific color
    let phenomColor = null;
    let assignedPhenomenaList = [];

    if (districtPhenomenaMap[oid] && districtPhenomenaMap[oid].size > 0) {
      // Find highest priority color based on phenDefs order
      for (const pDef of phenDefs) {
        if (districtPhenomenaMap[oid].has(pDef.id)) {
          if (!phenomColor) phenomColor = phenColors[pDef.id];
          assignedPhenomenaList.push(pDef);
        }
      }
    }

    // Marker and Text Logic
    if (!skipMarkers) {
      if (assignedPhenomenaList.length > 0) {
        layer.feature.properties.phenomenaText = assignedPhenomenaList
          .map((p) => p.hindi)
          .join(", ");

        // Add icon for the first/primary phenomenon
        const primary = assignedPhenomenaList[0];
        const iconHtml = `<div style="font-size: 32px; color: ${
          phenColors[primary.id]
        }; text-shadow: 0 0 3px #fff;">
                            <i class="fas ${primary.icon} phenom-anim-${
          primary.id
        }"></i>
                          </div>`;
        const icon = L.divIcon({
          html: iconHtml,
          className: "map-phenom-marker",
          iconSize: [40, 40],
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
            `
              )
              .join("")}
          </div>
        `;

        marker.bindPopup(popupContent);
      } else {
        delete layer.feature.properties.phenomenaText;
      }
    }

    if (phenomColor) {
      layer.setStyle({
        fillColor: phenomColor,
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
      `Configuration Error:\nThe following districts are not assigned to any regional group:\n${names}`
    );
  }
}

function updateDateTime() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  document.getElementById("currentDateTime").innerText = now.toLocaleString(
    "hi-IN",
    options
  );

  const h = now.getHours();
  let icon = "fa-moon";
  let iconStyle = "";

  if (h >= 6 && h < 18) {
    icon = "fa-sun";
    iconStyle = "color: #e67e22;"; // Orange for sun
  }

  const timeStr = now.toLocaleString("hi-IN", options);
  document.getElementById(
    "currentDateTime"
  ).innerHTML = `<i class="fas ${icon}" style="margin-right:8px; ${iconStyle}"></i>${timeStr}`;
}

function fetchTemperature() {
  // Patna coordinates (Capital of Bihar)
  const lat = 25.61;
  const lon = 85.14;
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.current_weather) {
        const temp = data.current_weather.temperature;
        document.getElementById(
          "currentTemp"
        ).innerHTML = `<i class="fas fa-temperature-high" style="margin-right:8px; color:#e74c3c;"></i>Patna: ${temp}°C`;
      }
    })
    .catch((err) => console.error("Weather fetch error:", err));
}

function initVisitorCounter() {
  let count = localStorage.getItem("page_views");
  if (!count) {
    count = 1500; // Start with base number
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
  currentDay = day;
  districtPhenomenaMap = weeklyData[day - 1];

  // Update UI tabs
  document.querySelectorAll(".day-tab").forEach((btn, idx) => {
    if (idx + 1 === day) btn.classList.add("active");
    else btn.classList.remove("active");
  });

  updateMapDateHeader();
  updateMapStyle();
}

function updateMapDateHeader() {
  const el = document.getElementById("mapDateDisplay");
  if (el) {
    const date = new Date();
    const targetDate = new Date();
    targetDate.setDate(date.getDate() + (currentDay - 1));

    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const todayStr = date
      .toLocaleDateString("en-IN", options)
      .replace(/\//g, "-");
    const targetDateStr = targetDate
      .toLocaleDateString("en-IN", options)
      .replace(/\//g, "-");

    el.innerHTML = `Date: ${todayStr} | Day ${currentDay}: ${targetDateStr}`;
  }
}

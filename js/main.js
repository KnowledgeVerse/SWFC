// ---------- Intensity lines (Scripts.xlsx order) ----------
const intensityLines = {
  thunderstorm:[
    'हल्के से मध्यम दर्जे की मेघ गर्जन तथा वज्रपात के साथ वर्षा जारी रहने की संभावना है।',
    'मध्यम दर्जे की मेघ गर्जन, वज्रपात के साथ वर्षा होने की प्रबल संभावना है।',
    'हल्के से मध्यम दर्जे की मेघ गर्जन, वज्रपात, (हवा की गति 30-40 कि. मी. प्रति घंटे तक) के साथ हल्की वर्षा होने की संभावना है।',
    'मध्यम दर्जे की मेघ गर्जन, वज्रपात,हवा (हवा की गति 40-50 कि. मी. प्रति घंटे तक) के साथ वर्षा होने की प्रबल संभावना है।',
    'तीव्र दर्जे की मेघ गर्जन, वज्रपात तथा भारी वर्षा के साथ तेज हवा (हवा की गति 50-60 कि. मी. प्रति घंटे तक) की प्रबल संभावना है।',
    'मेघ गर्जन, वज्रपात, ओलावृष्टि एवं  हवा (हवा की गति 40-50 कि. मी. प्रति घंटे तक) के साथ वर्षा होने की प्रबल संभावना है।'
  ],
  gustywind:[
    'तेज़ हवा (हवा की गति 30-40 कि. मी. प्रति घंटे तक) रहने की संभावना है।',
    'तेज़ हवा (हवा की गति 40-50 कि. मी. प्रति घंटे तक) रहने की संभावना है।',
    'तेज़ हवा (हवा की गति 50-60 कि. मी. प्रति घंटे तक) रहने की संभावना है।'
  ],
  heatwave:['लू (उष्ण लहर ) की संभावना है ।','उष्ण दिवस होने की संभावना है।','अत्यधिक भीषण उष्ण लहर (लू) की संभावना है।'],
  hailstorm:['ओलावृष्टि की संभावना है।'],
  heavyrain:['भारी वर्षा होने की संभावना है।'],
  densefog:['घना कोहरा / कुहासा छाए रहने की प्रबल संभावना है।','घना से बहुत घना कोहरा / कुहासा छाए रहने की प्रबल संभावना है।'],
  coldday:['शीत दिवस होने की संभावना है।'],
  warmnight:['गर्म रात्रि की संभावना है ।']
};

// ---------- Phenomena colour-map ----------
const phenColors = {
  thunderstorm:'#ffc107',   // Amber
  gustywind   :'#17a2b8',   // Info
  heatwave    :'#fd7e14',   // Orange
  hailstorm   :'#6f42c1',   // Indigo
  heavyrain   :'#007bff',   // Blue
  densefog    :'#6c757d',   // Grey
  coldday     :'#20c997',   // Teal
  warmnight   :'#e83e8c'    // Pink
};

// ---------- Globals ----------
let selectedDistricts=[], selectedPhenomena=[];

// ---------- Phenomena + Scripts.xlsx sub-options ----------
const phenDefs = [
  {id:'thunderstorm',hindi:'मेघगर्जन/वज्रपात',english:'Thunderstorm/Lightning',
   sub:['हल्के से मध्यम दर्जे की मेघ गर्जन तथा वज्रपात के साथ वर्षा जारी रहने की संभावना है।',
        'मध्यम दर्जे की मेघ गर्जन, वज्रपात के साथ वर्षा होने की प्रबल संभावना है।',
        'हल्के से मध्यम दर्जे की मेघ गर्जन, वज्रपात, (हवा की गति 30-40 कि. मी. प्रति घंटे तक) के साथ हल्की वर्षा होने की संभावना है।',
        'मध्यम दर्जे की मेघ गर्जन, वज्रपात,हवा (हवा की गति 40-50 कि. मी. प्रति घंटे तक) के साथ वर्षा होने की प्रबल संभावना है।',
        'तीव्र दर्जे की मेघ गर्जन, वज्रपात तथा भारी वर्षा के साथ तेज हवा (हवा की गति 50-60 कि. मी. प्रति घंटे तक) की प्रबल संभावना है।',
        'मेघ गर्जन, वज्रपात, ओलावृष्टि एवं  हवा (हवा की गति 40-50 कि. मी. प्रति घंटे तक) के साथ वर्षा होने की प्रबल संभावना है।']},
  {id:'gustywind',hindi:'तेज़ हवा',english:'Gusty Wind',
   sub:['तेज़ हवा (हवा की गति 30-40 कि. मी. प्रति घंटे तक) रहने की संभावना है।',
        'तेज़ हवा (हवा की गति 40-50 कि. मी. प्रति घंटे तक) रहने की संभावना है।',
        'तेज़ हवा (हवा की गति 50-60 कि. मी. प्रति घंटे तक) रहने की संभावना है।']},
  {id:'heatwave',hindi:'लू (उष्ण लहर)',english:'Heat Wave',
   sub:['लू (उष्ण लहर ) की संभावना है ।','उष्ण दिवस होने की संभावना है।','अत्यधिक भीषण उष्ण लहर (लू) की संभावना है।']},
  {id:'hailstorm',hindi:'ओलावृष्टि',english:'Hailstorm',sub:['ओलावृष्टि की संभावना है।']},
  {id:'heavyrain',hindi:'भारी वर्षा',english:'Heavy Rainfall',sub:['भारी वर्षा होने की संभावना है।']},
  {id:'densefog',hindi:'घना कोहरा',english:'Dense Fog',
   sub:['घना कोहरा / कुहासा छाए रहने की प्रबल संभावना है।','घना से बहुत घना कोहरा / कुहासा छाए रहने की प्रबल संभावना है।']},
  {id:'coldday',hindi:'शीत दिवस',english:'Cold Day',sub:['शीत दिवस होने की संभावना है।']},
  {id:'warmnight',hindi:'गर्म रात्रि',english:'Warm Night',sub:['गर्म रात्रि की संभावना है ।']}
];

// ---------- Init ----------
document.addEventListener('DOMContentLoaded',()=>{
  populateDistricts();
  buildRegionalGrid();
  buildMultipleDistrictGrid();
  buildPhenomenaPanel();
  attachHandlers();
});

// ---------- UI builders ----------
function populateDistricts(){
  const sel=document.getElementById('districtSelect');
  districtsData.forEach(d=>sel.add(new Option(`${d.hindi} (${d.name})`,d.id)));
}
function buildRegionalGrid(){
  const box=document.getElementById('regionalGrid');
  Object.entries(regionalGroups).forEach(([key,g])=>{
    const lbl=document.createElement('label'); lbl.className='regional-checkbox';
    lbl.innerHTML=`<input type="checkbox" value="${key}" onchange="updateRegionalSelection()">
                   <span>${g.name} – ${g.english}</span>`;
    box.appendChild(lbl);
  });
}
function buildMultipleDistrictGrid(){
  const grid=document.getElementById('districtGrid');
  districtsData.forEach(d=>{
    const lbl=document.createElement('label'); lbl.className='district-checkbox';
    lbl.innerHTML=`<input type="checkbox" value="${d.id}" onchange="updateMultipleSelection()">
                   <span>${d.hindi} (${d.name})</span>`;
    grid.appendChild(lbl);
  });
}
function buildPhenomenaPanel(){
  const box=document.getElementById('phenomenaContainer');
  phenDefs.forEach(d=>{
    const row=document.createElement('div');
    row.className='phenomenon-row';
    row.style.borderLeft=`5px solid ${phenColors[d.id]}`;   // यूनिक बॉर्डर
    row.innerHTML=`
      <input class="main-check same-size" type="checkbox" value="${d.id}" onchange="togglePhenom('${d.id}')">
      <label><strong>${d.hindi}</strong><br><small>${d.english}</small></label>
      <select class="sub-select intensity-select same-size" id="intensity-${d.id}">
        ${d.sub.map((s,i)=>`<option value="${i}">${s}</option>`).join('')}
      </select>`;
    box.appendChild(row);
  });
}

// ---------- Handlers ----------
function attachHandlers(){
  document.getElementById('selectionMode').onchange=toggleSelectionMode;
  document.getElementById('districtSelect').onchange=e=>{
    selectedDistricts=e.target.value?[e.target.value]:[];
  };
  document.getElementById('generateForecast').onclick=generateForecast;
  document.getElementById('clearSelection').onclick=clearSelection;
  document.getElementById('exportText').onclick=exportToText;
  document.getElementById('exportPDF').onclick=exportToPDF;
}
function toggleSelectionMode(){
  const mode=document.getElementById('selectionMode').value;
  ['singleDistrict','multipleDistricts','regionalGroups'].forEach(id=>document.getElementById(id).style.display='none');
  document.getElementById({single:'singleDistrict',multiple:'multipleDistricts',regional:'regionalGroups'}[mode]).style.display='block';
  clearSelection();
}
function updateMultipleSelection(){
  selectedDistricts=Array.from(document.querySelectorAll('#districtGrid input:checked')).map(cb=>cb.value);
}
function updateRegionalSelection(){
  selectedDistricts=[];
  document.querySelectorAll('#regionalGrid input:checked').forEach(cb=>{
    selectedDistricts.push(...regionalGroups[cb.value].districts.map(String));
  });
  selectedDistricts=[...new Set(selectedDistricts)];
}
function selectAllDistricts(){
  document.querySelectorAll('#districtGrid input').forEach(cb=>cb.checked=true); updateMultipleSelection();
}
function clearDistrictSelection(){
  document.querySelectorAll('#districtGrid input').forEach(cb=>cb.checked=false); updateMultipleSelection();
}
function togglePhenom(id){}   // placeholder

// ---------- Forecast ----------
function generateForecast(){
  if(!selectedDistricts.length){alert('कृपया कम से कम एक जिला चुनें।');return}

  selectedPhenomena=[];                       // सिर्फ़ चेक किए गए
  document.querySelectorAll('#phenomenaContainer input:checked').forEach(inp=>{
      const phenom    = inp.value;
      const intensity = document.getElementById(`intensity-${phenom}`).selectedIndex;
      const place     = document.getElementById('globalPlaceCount').value;
      selectedPhenomena.push({phenom,intensity,place});
  });

  if(!selectedPhenomena.length){alert('कृपया कम से कम एक मौसम घटना चुनें।');return}

  const forecasts=selectedDistricts.map(id=>makeForecastSentence(id,selectedPhenomena)).filter(Boolean);
  displayConsolidatedForecast(forecasts);
}
function makeForecastSentence(districtId,phenList){
  const d=getDistrictNameById(districtId); if(!d)return null;
  return {district:d,phenList};
}

function displayConsolidatedForecast(list){
  const hindiNames=list.map(x=>x.district.hindi);
  const engNames  =list.map(x=>x.district.name);
  const hindiStr=hindiNames.length===1?hindiNames[0]
                :hindiNames.length===2?`${hindiNames[0]} और ${hindiNames[1]}`
                :`${hindiNames.slice(0,-1).join(', ')} और ${hindiNames[hindiNames.length-1]}`;
  const engStr=engNames.length===1?engNames[0]
              :engNames.length===2?`${engNames[0]} and ${engNames[1]}`
              :`${engNames.slice(0,-1).join(', ')} and ${engNames[engNames.length-1]}`;

  // ---------- intensity lines (Scripts.xlsx order) ----------
  const intensityLines = {
    thunderstorm:[
      'हल्के से मध्यम दर्जे की मेघ गर्जन तथा वज्रपात के साथ वर्षा जारी रहने की संभावना है।',
      'मध्यम दर्जे की मेघ गर्जन, वज्रपात के साथ वर्षा होने की प्रबल संभावना है।',
      'हल्के से मध्यम दर्जे की मेघ गर्जन, वज्रपात, (हवा की गति 30-40 कि. मी. प्रति घंटे तक) के साथ हल्की वर्षा होने की संभावना है।',
      'मध्यम दर्जे की मेघ गर्जन, वज्रपात,हवा (हवा की गति 40-50 कि. मी. प्रति घंटे तक) के साथ वर्षा होने की प्रबल संभावना है।',
      'तीव्र दर्जे की मेघ गर्जन, वज्रपात तथा भारी वर्षा के साथ तेज हवा (हवा की गति 50-60 कि. मी. प्रति घंटे तक) की प्रबल संभावना है।',
      'मेघ गर्जन, वज्रपात, ओलावृष्टि एवं  हवा (हवा की गति 40-50 कि. मी. प्रति घंटे तक) के साथ वर्षा होने की प्रबल संभावना है।'
    ],
    gustywind:[
      'तेज़ हवा (हवा की गति 30-40 कि. मी. प्रति घंटे तक) रहने की संभावना है।',
      'तेज़ हवा (हवा की गति 40-50 कि. मी. प्रति घंटे तक) रहने की संभावना है।',
      'तेज़ हवा (हवा की गति 50-60 कि. मी. प्रति घंटे तक) रहने की संभावना है।'
    ],
    heatwave:['लू (उष्ण लहर ) की संभावना है ।','उष्ण दिवस होने की संभावना है।','अत्यधिक भीषण उष्ण लहर (लू) की संभावना है।'],
    hailstorm:['ओलावृष्टि की संभावना है।'],
    heavyrain:['भारी वर्षा होने की संभावना है।'],
    densefog:['घना कोहरा / कुहासा छाए रहने की प्रबल संभावना है।','घना से बहुत घना कोहरा / कुहासा छाए रहने की प्रबल संभावना है।'],
    coldday:['शीत दिवस होने की संभावना है।'],
    warmnight:['गर्म रात्रि की संभावना है ।']
  };
  const intensityLinesEn = {
    thunderstorm:[
      'Light to moderate thunderstorm & lightning with rain likely to continue.',
      'Moderate thunderstorm & lightning with rain very likely.',
      'Light to moderate thunderstorm, lightning (wind 30-40 kmph) with light rain likely.',
      'Moderate thunderstorm, lightning, wind (40-50 kmph) with rain very likely.',
      'Intense thunderstorm, lightning & heavy rain with strong wind (50-60 kmph) very likely.',
      'Thunderstorm, lightning, hail & wind (40-50 kmph) with rain very likely.'
    ],
    gustywind:['Gusty wind (speed 30-40 kmph) likely.','Gusty wind (speed 40-50 kmph) likely.','Gusty wind (speed 50-60 kmph) likely.'],
    heatwave:['Heat wave likely.','Hot day likely.','Severe heat wave likely.'],
    hailstorm:['Hailstorm likely.'],
    heavyrain:['Heavy rainfall likely.'],
    densefog:['Dense fog likely.','Very dense fog likely.'],
    coldday:['Cold day likely.'],
    warmnight:['Warm night likely.']
  };

  let html='';
  selectedPhenomena.forEach(p=>{
      const color = phenColors[p.phenom];
      const placeMap={1:'एक या दो स्थानों पर',2:'कुछ स्थानों',3:'अनेक स्थानों पर',4:'अधिकांश स्थानों पर'};
      const placeEng={1:'at one or two places',2:'at a few places',3:'at many places',4:'at most places'};

      // सिर्फ़ चुनी हुई intensity
      const intensitySentenceHi = intensityLines[p.phenom][p.intensity];
      const intensitySentenceEn = intensityLinesEn[p.phenom][p.intensity];

      const placePhraseHi = placeMap[p.place];
      const placePhraseEn = placeEng[p.place];

      const phenomNames={
        thunderstorm:{hindi:'मेघगर्जन/वज्रपात',english:'Thunderstorm/Lightning'},
        gustywind   :{hindi:'तेज़ हवा',english:'Gusty Wind'},
        heatwave    :{hindi:'लू (उष्ण लहर)',english:'Heat Wave'},
        hailstorm   :{hindi:'ओलावृष्टि',english:'Hailstorm'},
        heavyrain   :{hindi:'भारी वर्षा',english:'Heavy Rainfall'},
        densefog    :{hindi:'घना कोहरा',english:'Dense Fog'},
        coldday     :{hindi:'शीत दिवस',english:'Cold Day'},
        warmnight   :{hindi:'गर्म रात्रि',english:'Warm Night'}
      };
      const phenH=phenomNames[p.phenom].hindi;
      const phenE=phenomNames[p.phenom].english;

      const hindiFinal=`${hindiStr} जिलों के ${placePhraseHi} ${intensitySentenceHi}`;
      const engFinal=`${intensitySentenceEn} ${placePhraseEn} over ${engStr} districts.`;

      html+=`<div class="forecast-item" style="background:${color}20; border-left:5px solid ${color};">
               <strong>${phenH}</strong><br><small>${phenE}</small>
               <p style="margin-top:10px;font-size:1.05em">${hindiFinal}</p>
               <p style="font-style:italic;margin-top:6px">${engFinal}</p>
             </div>`;
  });
  document.getElementById('forecastContent').innerHTML=html;
}


// ---------- Export ----------
function exportToText(){
  const txt=document.getElementById('forecastContent').innerText;
  if(!txt||txt.includes('कोई जिला चुने')){alert('पहले पूर्वानुमान तैयार करें।');return;}
  const blob=new Blob([txt],{type:'text/plain'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download=`forecast-${new Date().toISOString().split('T')[0]}.txt`; a.click();
  URL.revokeObjectURL(url);
}
function exportToPDF(){
  const html=document.getElementById('forecastContent').innerHTML;
  if(!html||html.includes('कोई जिला चुने')){alert('पहले पूर्वानुमान तैयार करें।');return;}
  const win=window.open('','_blank');
  win.document.write(`<html><head><title>बिहार मौसम पूर्वानुमान</title><style>body{font-family:'Noto Sans Devanagari',sans-serif;padding:20px}</style></head><body><h1>बिहार मौसम पूर्वानुमान</h1><p>तिथि: ${new Date().toLocaleString('hi-IN')}</p>${html}</body></html>`);
  win.document.close(); win.print();
}

// ---------- Clear ----------
function clearSelection(){
  selectedDistricts=[]; selectedPhenomena=[];
  document.getElementById('districtSelect').value='';
  document.querySelectorAll('#districtGrid input').forEach(cb=>cb.checked=false);
  document.querySelectorAll('#regionalGrid input').forEach(cb=>cb.checked=false);
  document.querySelectorAll('#phenomenaContainer input').forEach(cb=>cb.checked=false);
  document.querySelectorAll('.intensity-select').forEach(s=>s.selectedIndex=0);
  document.getElementById('forecastContent').innerHTML='<p class="placeholder-text">कोई जिला चुने और मौसम घटनाएँ चुनें...</p>';
}
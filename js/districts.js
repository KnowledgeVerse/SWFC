// ---------- District data ----------
const districtsData = [
  {id:1, name:'ARARIA', hindi:'अररिया'}, {id:2, name:'ARWAL', hindi:'अरवल'},
  {id:3, name:'AURANGABAD', hindi:'औरंगाबाद'}, {id:4, name:'BANKA', hindi:'बांका'},
  {id:5, name:'BEGUSARAI', hindi:'बेगूसराय'}, {id:6, name:'BHABUA', hindi:'भभुआ'},
  {id:7, name:'BHAGALPUR', hindi:'भागलपुर'}, {id:8, name:'BHOJPUR', hindi:'भोजपुर'},
  {id:9, name:'BUXAR', hindi:'बक्सर'}, {id:10, name:'DARBHANGA', hindi:'दरभंगा'},
  {id:11, name:'EAST CHAMPARAN', hindi:'पूर्वी चंपारण'}, {id:12, name:'GAYA', hindi:'गया'},
  {id:13, name:'GOPALGANJ', hindi:'गोपालगंज'}, {id:14, name:'JAHANABAD', hindi:'जहानाबाद'},
  {id:15, name:'JAMUI', hindi:'जमुई'}, {id:16, name:'KATIHAR', hindi:'कटिहार'},
  {id:17, name:'KHAGARIA', hindi:'खगड़िया'}, {id:18, name:'KISHANGANJ', hindi:'किशनगंज'},
  {id:19, name:'LAKHISARAI', hindi:'लखीसराय'}, {id:20, name:'MADHEPURA', hindi:'मधेपुरा'},
  {id:21, name:'MADHUBANI', hindi:'मधुबनी'}, {id:22, name:'MONGHYR', hindi:'मुंगेर'},
  {id:23, name:'MUZAFFARPUR', hindi:'मुजफ्फरपुर'}, {id:24, name:'NALANDA', hindi:'नालंदा'},
  {id:25, name:'NAWADA', hindi:'नवादा'}, {id:26, name:'PATNA', hindi:'पटना'},
  {id:27, name:'PURNEA', hindi:'पूर्णिया'}, {id:28, name:'ROHTAS', hindi:'रोहतास'},
  {id:29, name:'SAHARSA', hindi:'सहरसा'}, {id:30, name:'SAMASTIPUR', hindi:'समस्तीपुर'},
  {id:31, name:'SARAN', hindi:'सारण'}, {id:32, name:'SHEIKHPURA', hindi:'शेखपुरा'},
  {id:33, name:'SHEOHAR', hindi:'शिवहर'}, {id:34, name:'SITAMARHI', hindi:'सीतामढ़ी'},
  {id:35, name:'SIWAN', hindi:'सिवान'}, {id:36, name:'SUPAUL', hindi:'सुपौल'},
  {id:37, name:'VAISHALI', hindi:'वैशाली'}, {id:38, name:'WEST CHAMPARAN', hindi:'पश्चिमी चंपारण'}
];

// ---------- Regional groups ----------
const regionalGroups = {
  foothill:{name:'उत्तर बिहार के तराई से सटे जिले',english:'North Bihar Foothill Districts',districts:[11,34,21,18,36,1,27,16,20]},
  'north-east':{name:'उत्तर-पूर्व क्षेत्र',english:'North-East Region',districts:[1,27,16,20,29,10,18]},
  'north-central':{name:'उत्तर-मध्य क्षेत्र',english:'North-Central Region',districts:[10,30,31,23,13]},
  'north-west':{name:'उत्तर-पश्चिम क्षेत्र',english:'North-West Region',districts:[38,11,34,33,35,9]},
  'south-east':{name:'दक्षिण-पूर्व क्षेत्र',english:'South-East Region',districts:[7,22,17,5,15]},
  'south-central':{name:'दक्षिण-मध्य क्षेत्र',english:'South-Central Region',districts:[26,14,24,32,19]},
  'south-west':{name:'दक्षिण-पश्चिम क्षेत्र',english:'South-West Region',districts:[12,25,3,28,8,2,6,4]}
};

// ---------- Utility ----------
function getDistrictNameById(id){
  const d=districtsData.find(x=>x.id===parseInt(id));
  return d?{name:d.name,hindi:d.hindi}:null;
}
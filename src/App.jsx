import React, { useState, useEffect } from 'react';

// Soil Types
const soilTypes = {
  English: ['Red Soil','Black Soil','Alluvial','Laterite','Loamy','Sandy'],
  'తెలుగు (Telugu)': ['ఎర్ర మట్టి','నల్ల మట్టి','ఆల్యూవియల్','లేటరైట్','లోమీ','ఇసుక'],
  'हिन्दी (Hindi)': ['लाल मिट्टी','काली मिट्टी','जलोढ़','लेटेराइट','दोमट','बालू']
};

// Crops
const crops = {
  English: ['Groundnut','Wheat','Rice','Maize','Cotton','Soybean'],
  'తెలుగు (Telugu)': ['పల్లీలు','గోధుమలు','బియ్యం','మొక్కజొన్న','పత్తి','సోయాబీన్'],
  'हिन्दी (Hindi)': ['मूंगफली','गेहूं','चावल','मक्का','कपास','सोयाबीन']
};

// Market Areas
const marketAreas = {
  English: ['Anantapur','Kurnool','Hyderabad','Bengaluru','Tirupati'],
  'తెలుగు (Telugu)': ['అనంతపూర్','కర్నూలు','హైదరాబాద్','బెంగళూరు','తిరుపతి'],
  'हिन्दी (Hindi)': ['अनंतपुर','कर्नूल','हैदराबाद','बेंगलुरु','तिरुपति']
};

const languages = ['English','తెలుగు (Telugu)','हिन्दी (Hindi)'];

// Translations
const translations = {
  English: {
    title: "SMART CROP",
    subtitle: "Advisory System for Farmers",
    language: "Language",
    soilType: "Soil Type",
    soilHealth: "Soil Health",
    soilHealthText: "Soil testing recommended. Maintain organic matter for better fertility.",
    location: "Location",
    crop: "Current Crop",
    market: "Market Area",
    marketPrice: "Market Price",
    infection: "Crop Infection Detection",
    getAdvisory: "Get Advisory",
    detailedAdvisory: "Detailed Advisory",
    noAdvisory: "No detailed advisory yet — click Get Advisory.",
    tollFree: "📞 Toll-free helpline: 1800-180-1551",
    rainfall: "🌧 Rainfall",
    fertilizerAdvice: {
      'Red Soil': "Use NPK 6:6:6 and organic compost to improve fertility.",
      'Black Soil': "Apply Nitrogen and Phosphorus; avoid waterlogging.",
      'Alluvial': "Balanced NPK mix works well; focus on Potash.",
      'Laterite': "Add lime and organic manure to neutralize acidity.",
      'Loamy': "Maintain with organic manure and micronutrients.",
      'Sandy': "Frequent doses of Nitrogen and compost are needed."
    }
  },
  'తెలుగు (Telugu)': {
    title: "స్మార్ట్ క్రాప్",
    subtitle: "రైతుల కోసం సలహా వ్యవస్థ",
    language: "భాష",
    soilType: "మట్టి రకం",
    soilHealth: "మట్టి ఆరోగ్యం",
    soilHealthText: "మట్టి పరీక్ష చేయించుకోవాలి. సేంద్రీయ పదార్థాన్ని ఉంచండి.",
    location: "ప్రాంతం",
    crop: "ప్రస్తుతం పంట",
    market: "మార్కెట్ ప్రాంతం",
    marketPrice: "మార్కెట్ ధర",
    infection: "పంట ఇన్ఫెక్షన్ గుర్తింపు",
    getAdvisory: "సలహా పొందండి",
    detailedAdvisory: "వివరణాత్మక సలహా",
    noAdvisory: "ఇప్పటివరకు సలహా లేదు — సలహా పొందండి.",
    tollFree: "📞 టోల్-ఫ్రీ సహాయం: 1800-180-1551",
    rainfall: "🌧 వర్షపాతం",
    fertilizerAdvice: {
      'ఎర్ర మట్టి': "ఎన్పీకే 6:6:6 మరియు సేంద్రీయ ఎరువులు వాడండి.",
      'నల్ల మట్టి': "నత్రజని, ఫాస్ఫరస్ వేసుకోండి; నీరు నిల్వ కాకుండా చూసుకోండి.",
      'ఆల్యూవియల్': "సమతుల్య ఎరువులు వాడండి; పొటాష్ పై దృష్టి పెట్టండి.",
      'లేటరైట్': "లైమ్ మరియు సేంద్రీయ ఎరువులు వేసుకోండి.",
      'లోమీ': "సేంద్రీయ ఎరువులు మరియు సూక్ష్మ పోషకాలు వాడండి.",
      'ఇసుక': "తరచుగా నత్రజని మరియు సేంద్రీయ ఎరువులు వేసుకోవాలి."
    }
  },
  'हिन्दी (Hindi)': {
    title: "स्मार्ट क्रॉप",
    subtitle: "किसानों के लिए परामर्श प्रणाली",
    language: "भाषा",
    soilType: "मिट्टी का प्रकार",
    soilHealth: "मिट्टी की सेहत",
    soilHealthText: "मिट्टी की जांच करवाएं। कार्बनिक पदार्थ बनाए रखें।",
    location: "स्थान",
    crop: "वर्तमान फसल",
    market: "बाज़ार क्षेत्र",
    marketPrice: "बाज़ार मूल्य",
    infection: "फसल संक्रमण पहचान",
    getAdvisory: "सलाह प्राप्त करें",
    detailedAdvisory: "विस्तृत सलाह",
    noAdvisory: "अभी कोई सलाह नहीं है — क्लिक करें।",
    tollFree: "📞 टोल-फ्री सहायता: 1800-180-1551",
    rainfall: "🌧 वर्षा",
    fertilizerAdvice: {
      'लाल मिट्टी': "एनपीके 6:6:6 और जैविक खाद का प्रयोग करें।",
      'काली मिट्टी': "नाइट्रोजन और फॉस्फोरस डालें; जलभराव से बचें।",
      'जलोढ़': "संतुलित एनपीके का प्रयोग करें; पोटाश पर ध्यान दें।",
      'लेटेराइट': "चूना और जैविक खाद डालें।",
      'दोमट': "जैविक खाद और सूक्ष्म पोषक डालें।",
      'बालू': "बार-बार नाइट्रोजन और जैविक खाद डालें।"
    }
  }
};

// Mock weather (added rainfall)
function mockWeather(location) {
  const temp = 24 + (location ? location.length % 10 : 6);
  const condition = (location && location.toLowerCase().includes('ananta')) ? 'Rain' : (temp > 28 ? 'Sunny' : 'Cloudy');
  const rainfall = Math.floor(Math.random() * 100); // mm rainfall
  return { temp, condition, rainfall };
}

// Mock market price
function mockMarketPrice(crop, market){
  const base = crop.length * 100;
  const fluctuation = Math.floor(Math.random()*50);
  return base + fluctuation;
}

// Advisory Generator
function generateAdvisory({ soilType, crop, market, infectionResult, weather }, t){
  const adv = [];
  if (soilType) {
    adv.push(`${t.soilType}: ${soilType}`);
    if (t.fertilizerAdvice && t.fertilizerAdvice[soilType]) {
      adv.push(t.fertilizerAdvice[soilType]);
    }
  }
  if (crop) adv.push(`${t.crop}: ${crop}`);
  if (market) adv.push(`${t.market}: ${market}`);
  if (infectionResult) adv.push(`🩺 ${infectionResult}`);
  if (weather) adv.push(`${t.rainfall}: ${weather.rainfall} mm`);

  if (adv.length === 0) adv.push(t.noAdvisory);
  return adv;
}

// 🔹 MAIN COMPONENT
export default function SmartCropWebsite(){
  const [language, setLanguage] = useState('English');
  const [soilType, setSoilType] = useState(soilTypes[language][0]);
  const [location, setLocation] = useState(marketAreas[language][0]);
  const [crop, setCrop] = useState(crops[language][0]);
  const [market, setMarket] = useState(marketAreas[language][0]);
  const [weather, setWeather] = useState(() => mockWeather(marketAreas[language][0]));
  const [advisory, setAdvisory] = useState([]);
  const [marketPrice, setMarketPrice] = useState(mockMarketPrice(crops[language][0],marketAreas[language][0]));

  // Infection detection states
  const [cropImage, setCropImage] = useState(null);
  const [infectionResult, setInfectionResult] = useState("");

  const t = translations[language];

  // 🔹 Reset values when language changes
  useEffect(()=>{
    const newSoil = soilTypes[language][0];
    const newCrop = crops[language][0];
    const newMarket = marketAreas[language][0];
    setSoilType(newSoil);
    setCrop(newCrop);
    setMarket(newMarket);
    setLocation(newMarket);
    setAdvisory([]);
  },[language]);

  useEffect(()=>{ setWeather(mockWeather(location)); }, [location]);
  useEffect(()=>{ setMarketPrice(mockMarketPrice(crop, market)); }, [crop, market]);

  function handleGetAdvisory(e){
    e.preventDefault();
    setAdvisory(generateAdvisory({ soilType, crop, market, infectionResult, weather }, t));
  }

  // Mock infection detection
  function detectInfection(){
    const results = [
      "Healthy crop ✅",
      "Possible fungal infection 🍄 – Use fungicide.",
      "Possible bacterial infection 🦠 – Maintain soil hygiene.",
      "Pest detected 🐛 – Use organic pesticide.",
      "Nutrient deficiency – Add micronutrients."
    ];
    return results[Math.floor(Math.random()*results.length)];
  }

  function handleImageUpload(e){
    const file = e.target.files[0];
    if (file){
      setCropImage(URL.createObjectURL(file));
      setInfectionResult(detectInfection());
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row gap-6">
          {/* LEFT FORM */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-center md:text-left">{t.title}</h1>
            <p className="text-sm text-center md:text-left mb-4">{t.subtitle}</p>

            <form onSubmit={handleGetAdvisory} className="space-y-4">
              {/* Language */}
              <div>
                <label className="block text-sm font-medium">{t.language}</label>
                <select value={language} onChange={e=>setLanguage(e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-2">
                  {languages.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              {/* Soil Type */}
              <div>
                <label className="block text-sm font-medium">{t.soilType}</label>
                <select value={soilType} onChange={e=>setSoilType(e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-2">
                  {soilTypes[language].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Soil Health */}
              <div>
                <label className="block text-sm font-medium">{t.soilHealth}</label>
                <div className="mt-1 w-full border rounded-xl px-3 py-2 text-sm bg-gray-50">{t.soilHealthText}</div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium">{t.location}</label>
                <input value={location} onChange={e=>setLocation(e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-2" placeholder={t.location} />
              </div>

              {/* Crop */}
              <div>
                <label className="block text-sm font-medium">{t.crop}</label>
                <select value={crop} onChange={e=>setCrop(e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-2">
                  {crops[language].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Market */}
              <div>
                <label className="block text-sm font-medium">{t.market}</label>
                <select value={market} onChange={e=>setMarket(e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-2">
                  {marketAreas[language].map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              {/* Weather & Market Price */}
              <div className="flex items-center justify-between border-t pt-3">
                <div>
                  <div className="text-sm">{weather.condition}</div>
                  <div className="text-xs text-gray-500">{weather.temp}°C</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">{t.marketPrice}</div>
                  <div className="mt-1 border rounded-xl px-3 py-2 text-sm">₹{marketPrice}/quintal</div>
                </div>
              </div>

              {/* Infection Upload */}
              <div>
                <label className="block text-sm font-medium">{t.infection}</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-1 w-full border rounded-xl px-3 py-2" />
                {cropImage && (
                  <div className="mt-2">
                    <img src={cropImage} alt="Crop" className="w-40 h-40 object-cover rounded-xl border" />
                    <p className="mt-2 text-sm font-medium">{infectionResult}</p>
                  </div>
                )}
              </div>

              <button type="submit" className="mt-4 w-full md:w-auto rounded-xl border py-2 px-6 font-medium bg-green-600 text-white">{t.getAdvisory}</button>
            </form>

            {/* Toll-Free Helpline (separate section) */}
            <div className="mt-6 p-3 bg-yellow-100 rounded-xl text-sm font-medium text-center">
              {t.tollFree}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="flex-1">
            <div className="text-sm font-semibold">{t.detailedAdvisory}</div>
            <ul className="mt-2 space-y-2 text-sm max-h-80 overflow-auto">
              {advisory.length === 0 && <li className="text-gray-500">{t.noAdvisory}</li>}
              {advisory.map((a,i)=> <li key={i} className="border rounded-lg p-2">{a}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';

const soilTypes = {
  English: ['Red Soil','Black Soil','Alluvial','Laterite','Loamy','Sandy'],
  'తెలుగు (Telugu)': ['ఎర్ర మట్టి','నల్ల మట్టి','ఆల్యూవియల్','లేటరైట్','లోమీ','ఇసుక'],
  'हिन्दी (Hindi)': ['लाल मिट्टी','काली मिट्टी','जलोढ़','लेटेराइट','दोमट','बालू']
};

const crops = {
  English: ['Groundnut','Wheat','Rice','Maize','Cotton','Soybean'],
  'తెలుగు (Telugu)': ['పల్లీలు','గోధుమలు','బియ్యం','మొక్కజొన్న','పత్తి','సోయాబీన్'],
  'हिन्दी (Hindi)': ['मूंगफली','गेहूं','चावल','मक्का','कपास','सोयाबीन']
};

const marketAreas = {
  English: ['Anantapur','Kurnool','Hyderabad','Bengaluru','Tirupati'],
  'తెలుగు (Telugu)': ['అనంతపూర్','కర్నూలు','హైదరాబాద్','బెంగళూరు','తిరుపతి'],
  'हिन्दी (Hindi)': ['अनंतपुर','कर्नूल','हैदराबाद','बेंगलुरु','तिरुपति']
};

const languages = ['English','తెలుగు (Telugu)','हिन्दी (Hindi)'];

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
    getAdvisory: "Get Advisory",
    detailedAdvisory: "Detailed Advisory",
    noAdvisory: "No detailed advisory yet — click Get Advisory.",
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
    subtitle: "రైతులకు సలహా వ్యవస్థ",
    language: "భాష",
    soilType: "భూసారం రకం",
    soilHealth: "భూసారం ఆరోగ్యం",
    soilHealthText: "భూమి పరీక్ష చేయడం సిఫార్సు. మెరుగైన ఫలితాల కోసం సేంద్రియ పదార్థాన్ని నిలుపుకోండి.",
    location: "ప్రాంతం",
    crop: "ప్రస్తుత పంట",
    market: "మార్కెట్ ప్రాంతం",
    marketPrice: "మార్కెట్ ధర",
    getAdvisory: "సలహా పొందండి",
    detailedAdvisory: "వివరమైన సలహా",
    noAdvisory: "ఇప్పటివరకు ఎటువంటి సలహా లేదు — సలహా పొందండి బటన్ నొక్కండి.",
    fertilizerAdvice: {
      'ఎర్ర మట్టి': "ఎన్‌పీకే 6:6:6 మరియు సేంద్రీయ కంపోస్ట్ ఉపయోగించండి.",
      'నల్ల మట్టి': "నైట్రోజన్ మరియు ఫాస్పరస్ వాడండి; నీరు నిల్వ కాకుండా జాగ్రత్తపడండి.",
      'ఆల్యూవియల్': "సమతుల్య ఎన్‌పీకే మిశ్రమం బాగా పనిచేస్తుంది; పొటాష్‌పై దృష్టి పెట్టండి.",
      'లేటరైట్': "అమ్లత్వం తగ్గించడానికి లైమ్ మరియు సేంద్రీయ ఎరువులు జోడించండి.",
      'లోమీ': "సేంద్రియ ఎరువులు మరియు మైక్రోన్యూట్రియెంట్లతో నిర్వహించండి.",
      'ఇసుక': "తరచుగా నైట్రోజన్ మరియు కంపోస్ట్ మోతాదులు అవసరం."
    }
  },
  'हिन्दी (Hindi)': {
    title: "स्मार्ट क्रॉप",
    subtitle: "किसानों के लिए परामर्श प्रणाली",
    language: "भाषा",
    soilType: "मिट्टी का प्रकार",
    soilHealth: "मिट्टी की सेहत",
    soilHealthText: "मिट्टी की जांच की सलाह दी जाती है। बेहतर उपज के लिए जैविक पदार्थ बनाए रखें।",
    location: "स्थान",
    crop: "वर्तमान फसल",
    market: "बाजार क्षेत्र",
    marketPrice: "बाजार मूल्य",
    getAdvisory: "सलाह प्राप्त करें",
    detailedAdvisory: "विस्तृत सलाह",
    noAdvisory: "अभी तक कोई विस्तृत सलाह नहीं — सलाह प्राप्त करें बटन दबाएँ।",
    fertilizerAdvice: {
      'लाल मिट्टी': "एनपीके 6:6:6 और जैविक खाद का उपयोग करें।",
      'काली मिट्टी': "नाइट्रोजन और फॉस्फोरस डालें; जलभराव से बचें।",
      'जलोढ़': "संतुलित एनपीके मिश्रण अच्छा काम करता है; पोटाश पर ध्यान दें।",
      'लेटेराइट': "अम्लता को संतुलित करने के लिए चूना और जैविक खाद डालें।",
      'दोमट': "जैविक खाद और सूक्ष्म पोषक तत्वों के साथ बनाए रखें।",
      'बालू': "नाइट्रोजन और खाद की बार-बार खुराक की आवश्यकता है।"
    }
  }
};

function mockWeather(location) {
  const temp = 24 + (location ? location.length % 10 : 6);
  const condition = (location && location.toLowerCase().includes('ananta')) ? 'Rain' : (temp > 28 ? 'Sunny' : 'Cloudy');
  return { temp, condition };
}

function mockMarketPrice(crop, market){
  const base = crop.length * 100;
  const fluctuation = Math.floor(Math.random()*50);
  return base + fluctuation;
}

function generateAdvisory({ soilType, crop, market }, t){
  const adv = [];
  if (!soilType) adv.push(t.soilType + ': ' + t.noAdvisory);
  if (soilType) adv.push(`${t.soilHealth}: ${soilType}.`);
  if (soilType && t.fertilizerAdvice && t.fertilizerAdvice[soilType]) {
    adv.push(t.fertilizerAdvice[soilType]);
  }
  if (crop) adv.push(`${crop} ${t.crop} ✔`);
  if (market) adv.push(`${t.market}: ${market}`);
  if (adv.length === 0) adv.push(t.noAdvisory);
  return adv;
}

export default function SmartCropWebsite(){
  const [language, setLanguage] = useState('English');
  const [soilType, setSoilType] = useState(soilTypes[language][0]);
  const [location, setLocation] = useState(marketAreas[language][0]);
  const [crop, setCrop] = useState(crops[language][0]);
  const [market, setMarket] = useState(marketAreas[language][0]);
  const [weather, setWeather] = useState(() => mockWeather(marketAreas[language][0]));
  const [advisory, setAdvisory] = useState([]);
  const [marketPrice, setMarketPrice] = useState(mockMarketPrice(crops[language][0],marketAreas[language][0]));

  const t = translations[language];

  useEffect(()=>{
    setSoilType(soilTypes[language][0]);
    setCrop(crops[language][0]);
    setMarket(marketAreas[language][0]);
    setLocation(marketAreas[language][0]);
  },[language]);

  useEffect(()=>{ setWeather(mockWeather(location)); }, [location]);
  useEffect(()=>{ setMarketPrice(mockMarketPrice(crop, market)); }, [crop, market]);

  function handleGetAdvisory(e){
    e.preventDefault();
    setAdvisory(generateAdvisory({ soilType, crop, market }, t));
  }

  function speakAdvisory(){
    if (!('speechSynthesis' in window)) { alert('Voice support not available'); return; }
    const utter = new SpeechSynthesisUtterance(advisory.join('. '));
    utter.lang = language.includes('Telugu') ? 'te-IN' : language.includes('Hindi') ? 'hi-IN' : 'en-IN';
    window.speechSynthesis.speak(utter);
  }

  function startVoiceInput(fieldSetter){
    if (!('webkitSpeechRecognition' in window)) { alert('Voice input not supported'); return; }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = language.includes('Telugu') ? 'te-IN' : language.includes('Hindi') ? 'hi-IN' : 'en-IN';
    recognition.start();
    recognition.onresult = (event)=>{ fieldSetter(event.results[0][0].transcript); };
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row gap-6">
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
                <div className="flex gap-2 mt-1">
                  <input value={location} onChange={e=>setLocation(e.target.value)} className="flex-1 border rounded-xl px-3 py-2" placeholder={t.location} />
                  <button type="button" onClick={()=>startVoiceInput(setLocation)} className="px-3 py-2 border rounded-xl">🎤</button>
                </div>
              </div>

              {/* Crop */}
              <div>
                <label className="block text-sm font-medium">{t.crop}</label>
                <div className="flex gap-2 mt-1">
                  <select value={crop} onChange={e=>setCrop(e.target.value)} className="flex-1 border rounded-xl px-3 py-2">
                    {crops[language].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <button type="button" onClick={()=>startVoiceInput(setCrop)} className="px-3 py-2 border rounded-xl">🎤</button>
                </div>
              </div>

              {/* Market */}
              <div>
                <label className="block text-sm font-medium">{t.market}</label>
                <div className="flex gap-2 mt-1">
                  <select value={market} onChange={e=>setMarket(e.target.value)} className="flex-1 border rounded-xl px-3 py-2">
                    {marketAreas[language].map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <button type="button" onClick={()=>startVoiceInput(setMarket)} className="px-3 py-2 border rounded-xl">🎤</button>
                </div>
              </div>

              {/* Weather & Market Price */}
              <div className="flex items-center justify-between border-t pt-3">
                <div className="flex items-center gap-3">
                  <WeatherIcon condition={weather.condition} />
                  <div>
                    <div className="text-sm">{weather.condition}</div>
                    <div className="text-xs text-gray-500">{weather.temp}°C</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">{t.marketPrice}</div>
                  <div className="mt-1 border rounded-xl px-3 py-2 text-sm">₹{marketPrice}/quintal</div>
                </div>
              </div>

              <button type="submit" className="mt-4 w-full md:w-auto rounded-xl border py-2 px-6 font-medium bg-green-600 text-white">{t.getAdvisory}</button>
            </form>
          </div>

          <div className="flex-1">
            <div className="text-sm font-semibold flex items-center justify-between">
              {t.detailedAdvisory}
              {advisory.length > 0 && (
                <button onClick={speakAdvisory} className="ml-2 text-xs px-2 py-1 border rounded-md bg-gray-100">🔊</button>
              )}
            </div>
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

// Weather Icon Component
function WeatherIcon({ condition }){
  switch(condition){
    case 'Rain': return (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a5 5 0 015-5h1"/>
        <path d="M20 16c0-2.76-2.24-5-5-5H9"/>
        <line x1="8" y1="19" x2="8" y2="21"/>
        <line x1="12" y1="19" x2="12" y2="21"/>
        <line x1="16" y1="19" x2="16" y2="21"/>
      </svg>
    );
    case 'Sunny': return (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#facc15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    );
    default: return (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/>
      </svg>
    );
  }
}

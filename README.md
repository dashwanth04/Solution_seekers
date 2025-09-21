# Smart Crop Website (React Component)

A **responsive, multilingual crop advisory system** for farmers built with **React** and **Tailwind CSS**. Provides soil health recommendations, fertilizer guidance, market prices, and basic weather info. Includes voice support for both input and output.

---

## Features

- **Responsive Design:** Works on both desktop and mobile devices.
- **Tailwind CSS:** Modern, utility-first styling.
- **Multilingual Support:** English, Telugu, and Hindi.
- **Soil Health Advisory:** Recommends soil testing and organic matter maintenance.
- **Fertilizer Recommendations:** Contextual advice based on soil type.
- **Mock Weather Info:** Simple temperature and condition generation.
- **Market Prices:** Real-time mock market price per quintal.
- **Voice Support:**
  - Listen to advisory using `speechSynthesis`.
  - Input soil, crop, location using voice (`webkitSpeechRecognition`).

---

## Screenshots

![Desktop View](screenshot-desktop.png)  
![Mobile View](screenshot-mobile.png)  

*(Optional: Add actual screenshots of your component)*

---

## Installation

1. Ensure you have a React project with **Tailwind CSS** installed. For example, using **Vite**:

```bash
npm create vite@latest my-app
cd my-app
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

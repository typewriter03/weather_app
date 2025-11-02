# Weather Analytics Dashboard

This is a web-based Weather Analytics Dashboard built from scratch using React, Redux, and Firebase. It allows users to view current weather, 5-7 day forecasts, and explore interactive charts for multiple cities. User favorites and settings are saved to their account via Google Sign-In.

## Project Walkthrough Video

A complete video walkthrough of this project is available, explaining the core features and architecture.

**[[Link to Video Here](https://youtu.be/pQR6W6FI0NU)]**
https://www.youtube.com/watch?v=pQR6W6FI0NU

## Core Features

* **Dynamic Dashboard:** A main dashboard that displays summary "weather cards" for all of a user's favorited cities.
* **Detailed View:** A dedicated page for each city with in-depth analytics, including:
    * 5-7 day forecast.
    * Hour-by-hour forecast for the current day.
    * Detailed stats like Pressure, Dew Point (Feels Like), Humidity, and UV Index.
* **Search & Favorites:**
    * A search bar to look up new cities.
    * The ability to add cities to a "favorites" list.
    * Favorites persist between sessions.
* **Data Visualizations (Recharts):**
    * Interactive charts for hourly and daily temperature trends.
    * Bar charts for precipitation patterns.
    * Hover tooltips and responsive design for all charts.
* **Settings:**
    * A global toggle to switch all temperature units between **Celsius** and **Fahrenheit**.

## Bonus Features

* **Google Authentication:** Users can sign in with their Google account. Favorites and settings are tied to their account, not just their browser.
* **Real-time Data & Caching:**
    * Data is cached to reduce API calls.
    * Data is considered "stale" and automatically refetched if it's older than 60 seconds, ensuring live data.

## Technical Stack

* **Frontend:** React (with Hooks)
* **State Management:** Redux & Redux Toolkit
* **Routing:** React Router DOM
* **API Client:** Axios
* **Charting:** Recharts
* **Authentication:** Firebase Authentication (Google Sign-In)
* **API:** WeatherAPI.com

## Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository (or download the code):**
    ```bash
    git clone [repo_link.git]
    cd weather-dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    You need two credentials files:

    * **a) Weather API Key:**
        Create a file named `.env.local` in the project root and add your API key from [WeatherAPI.com](https://www.weatherapi.com/).
        ```
        VITE_WEATHER_API_KEY='your_weather_api_key_here'
        ```

    * **b) Firebase Configuration:**
        Create a file named `src/firebaseConfig.js`. Get your configuration object from the Firebase Console.
        ```javascript
        // src/firebaseConfig.js
        import { initializeApp } from "firebase/app";
        import { getAuth, GoogleAuthProvider } from "firebase/auth";
        
        // !! REPLACE THIS WITH YOUR OWN CONFIG !!
        const firebaseConfig = {
          apiKey: "YOUR_API_KEY",
          authDomain: "YOUR_AUTH_DOMAIN",
          projectId: "YOUR_PROJECT_ID",
          storageBucket: "YOUR_STORAGE_BUCKET",
          messagingSenderId: "YOUR_SENDER_ID",
          appId: "YOUR_APP_ID"
        };
        
        const app = initializeApp(firebaseConfig);
        export const auth = getAuth(app);
        export const googleProvider = new GoogleAuthProvider();
        ```

4.  **Run the application:**
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

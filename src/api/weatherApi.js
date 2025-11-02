// src/api/weatherApi.js
import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';


export const fetchWeatherData = async (city) => {
  try {
    // We request 'forecast.json', ask for 7 days, and include air quality data (aqi=yes)
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: city,
        days: 7, // For the 5-7 day forecast requirement
        aqi: 'no',
        alerts: 'no'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error.response?.data?.error?.message || error.message);
    // Re-throw the error so the Redux thunk can catch it
    throw new Error(error.response?.data?.error?.message || 'Failed to fetch weather data');
  }
};
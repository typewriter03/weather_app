// src/pages/DashboardPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherByCity } from '../features/weather/weatherSlice';
import WeatherCard from '../components/WeatherCard';
import SearchBar from '../components/SearchBar';

const CACHE_DURATION_MS = 60 * 1000;

const DashboardPage = () => {
  const dispatch = useDispatch();
  
  const favoriteCities = useSelector((state) => state.favorites.cities);
  
  const dataByCity = useSelector((state) => state.weather.dataByCity);

  useEffect(() => {
    favoriteCities.forEach(city => {
      const cityData = dataByCity[city];
      
      
      if (!cityData) {
        dispatch(fetchWeatherByCity(city));
        return; 
      }

      
      const isStale = Date.now() - cityData.lastFetched > CACHE_DURATION_MS;
      
      
      if (cityData.status !== 'loading' && isStale) {
        dispatch(fetchWeatherByCity(city));
      }
    });
  }, [favoriteCities, dispatch, dataByCity]); 

  
  const weatherCards = favoriteCities
    .map(cityKey => {
      const cityData = dataByCity[cityKey];
      
      
      if (!cityData) {
        return (
          <WeatherCard 
            key={cityKey} 
            cityKey={cityKey} 
            cityData={{ status: 'loading' }} 
          />
        );
      }
      
      
      return (
        <WeatherCard 
          key={cityKey} 
          cityKey={cityKey} 
          cityData={cityData} 
        />
      );
    });

  return (
    <div className="dashboard-container">
      <SearchBar />
      <h2>My Dashboard</h2>
      
      {}

      <div className="weather-cards-grid">
        {weatherCards.length > 0 ? (
          weatherCards
        ) : (
          <p>No weather data to show. Add a city!</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
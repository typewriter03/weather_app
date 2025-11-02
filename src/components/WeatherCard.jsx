// src/components/WeatherCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite } from '../features/favorites/favoritesSlice';

const WeatherCard = ({ cityKey, cityData }) => {
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.settings.units);
  
  const authState = useSelector((state) => state.auth);
  const isMetric = unit === 'metric';

  const handleRemove = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    
    dispatch(removeFavorite({ 
      cityKey: cityKey, 
      authState: authState 
    }));
  };
  
  

  // Case 1: Loading
  if (cityData.status === 'loading') {
    return (
      <div className="weather-card loading-card">
        <button onClick={handleRemove} className="remove-city-btn">X</button>
        <div className="card-header">
          <h3 style={{ textTransform: 'capitalize' }}>{cityKey}</h3>
        </div>
        <div className="card-body">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Case 2: Failed
  if (cityData.status === 'failed') {
    return (
      <div className="weather-card error-card">
        <button onClick={handleRemove} className="remove-city-btn">X</button>
        <div className="card-header">
          <h3 style={{ textTransform: 'capitalize' }}>{cityKey}</h3>
        </div>
        <div className="card-body">
          <p>Error: {cityData.error || 'Failed to load'}</p>
        </div>
      </div>
    );
  }

  // Case 3: Succeeded
  const { location, current } = cityData.data;
  const citySlug = location.name.toLowerCase();

  const displayTemp = isMetric ? current.temp_c : current.temp_f;
  const displayUnit = isMetric ? '°C' : '°F';
  const displayWind = isMetric ? `${current.wind_kph} kph` : `${current.wind_mph} mph`;

  return (
    <Link to={`/city/${citySlug}`} className="weather-card">
      <button onClick={handleRemove} className="remove-city-btn">X</button>

      <div className="card-header">
        <h3>{location.name}</h3>
        <p>{location.region}, {location.country}</p>
      </div>
      
      <div className="card-body">
        <img 
          src={current.condition.icon} 
          alt={current.condition.text} 
        />
        <div className="temp-display">
          {Math.round(displayTemp)}{displayUnit}
        </div>
        <p>{current.condition.text}</p>
      </div>

      <div className="card-footer">
        <p>Humidity: {current.humidity}%</p>
        <p>Wind: {displayWind}</p>
      </div>
    </Link>
  );
};

export default WeatherCard;
// src/pages/DetailedViewPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TemperatureChart from '../components/TemperatureChart';
import PrecipitationChart from '../components/PrecipitationChart';


const formatHour = (timeStr) => {
  
  return timeStr.split(' ')[1]; 
};

const DetailedViewPage = () => {
  const { cityName } = useParams();
  
  const cityData = useSelector((state) => state.weather.dataByCity[cityName]);
  const unit = useSelector((state) => state.settings.units);
  const isMetric = unit === 'metric';

  
  if (!cityData || cityData.status === 'loading') {
    return (
      <div className="detailed-view-container">
        <Link to="/">&larr; Back to Dashboard</Link>
        <h1 style={{ textTransform: 'capitalize' }}>Loading Details for {cityName}...</h1>
      </div>
    );
  }

  if (cityData.status === 'failed') {
     return (
      <div className="detailed-view-container">
        <Link to="/">&larr; Back to Dashboard</Link>
        <h1 style={{ textTransform: 'capitalize' }}>Error for {cityName}</h1>
        <p>{cityData.error}</p>
      </div>
    );
  }

  
  const { location, current, forecast } = cityData.data;

  
  const dailyForecast = forecast.forecastday.map(day => (
    <div key={day.date} className="daily-forecast-item">
      <p>{new Date(day.date_epoch * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
      <img src={day.day.condition.icon} alt={day.day.condition.text} />
      <p>
        {isMetric 
          ? `${Math.round(day.day.maxtemp_c)}°C` 
          : `${Math.round(day.day.maxtemp_f)}°F`}
      </p>
      <p>
        {isMetric 
          ? `${Math.round(day.day.mintemp_c)}°C` 
          : `${Math.round(day.day.mintemp_f)}°F`}
      </p>
    </div>
  ));

  
  const hourlyData = forecast.forecastday[0].hour.map(hour => ({
    time: formatHour(hour.time),
    temp_c: hour.temp_c,
    temp_f: hour.temp_f,
    chance_of_rain: hour.chance_of_rain,
  }));

 
  const currentTemp = isMetric ? current.temp_c : current.temp_f;
  const feelsLike = isMetric ? current.feelslike_c : current.feelslike_f;
  const windSpeed = isMetric ? `${current.wind_kph} kph` : `${current.wind_mph} mph`;
  const unitSymbol = isMetric ? '°C' : '°F';

  return (
    <div className="detailed-view-container">
      <Link to="/">&larr; Back to Dashboard</Link>
      
      <div className="detail-header">
        <h2>{location.name}, {location.country}</h2>
        <p>Last updated: {current.last_updated}</p>
      </div>

      {}
      {}
      <div className="detail-main-content">
        
        {}
        <section className="current-conditions">
          <h3>Current Conditions</h3>
          <div className="current-stats-grid">
            <div className="stat-card main-temp">
              <img src={current.condition.icon} alt={current.condition.text} />
              <div>
                <p>{current.condition.text}</p>
                <span>{Math.round(currentTemp)}</span>{unitSymbol}
              </div>
            </div>
            <div className="stat-card">
              <p>Feels Like</p>
              <span>{Math.round(feelsLike)}</span>{unitSymbol}
            </div>
            <div className="stat-card">
              <p>Wind</p>
              <span>{windSpeed} {current.wind_dir}</span>
            </div>
            <div className="stat-card">
              <p>Pressure</p>
              <span>{current.pressure_mb} mb</span>
            </div>
            <div className="stat-card">
              <p>Humidity</p>
              <span>{current.humidity}%</span>
            </div>
            <div className="stat-card">
              <p>UV Index</p>
              <span>{current.uv}</span>
            </div>
          </div>
        </section>

        {}
        <section className="analytics">
          <h3>Today's Analytics</h3>
          <div className="charts-grid">
            <TemperatureChart data={hourlyData} unit={unit} />
            <PrecipitationChart data={hourlyData} />
          </div>
        </section>
        
      </div>
      {}


      {}
      {}
      <section className="daily-forecast">
        <h3>7-Day Forecast</h3>
        <div className="daily-forecast-container">
          {dailyForecast}
        </div>
      </section>

    </div>
  );
};

export default DetailedViewPage;
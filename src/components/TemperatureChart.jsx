// src/components/TemperatureChart.jsx
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const TemperatureChart = ({ data, unit }) => {
  const tempKey = unit === 'metric' ? 'temp_c' : 'temp_f';
  const unitSymbol = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="chart-container">
      <h4>Hourly Temperature Trend</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis label={{ value: `Temp (${unitSymbol})`, angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value) => `${value}${unitSymbol}`} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey={tempKey} 
            name={`Temp (${unitSymbol})`} 
            stroke="#8884d8" 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;
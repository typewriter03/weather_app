// src/components/PrecipitationChart.jsx
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';


const PrecipitationChart = ({ data }) => {
  return (
    <div className="chart-container">
      <h4>Hourly Chance of Rain</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="time" />
          <YAxis label={{ value: 'Chance (%)', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          <Bar 
            dataKey="chance_of_rain" 
            name="Chance of Rain (%)" 
            fill="#82ca9d" 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PrecipitationChart;
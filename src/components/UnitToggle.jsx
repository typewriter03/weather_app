// src/components/UnitToggle.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleUnits } from '../features/settings/settingsSlice';

const UnitToggle = () => {
  const dispatch = useDispatch();
  const currentUnit = useSelector((state) => state.settings.units); // 'metric' or 'imperial'

  const handleToggle = () => {
    dispatch(toggleUnits());
  };

  
  const isMetric = currentUnit === 'metric';

  return (
    <button onClick={handleToggle} className="unit-toggle-btn">
      Switch to °{isMetric ? 'F' : 'C'}
    </button>
  );
};


export default UnitToggle;
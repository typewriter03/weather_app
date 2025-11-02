// src/features/settings/settingsSlice.js
import { createSlice } from '@reduxjs/toolkit';


const loadSettings = () => {
  try {
    const serializedSettings = localStorage.getItem('weatherSettings');
    if (serializedSettings === null) {
      return { units: 'metric' }; 
    }
    return JSON.parse(serializedSettings);
  } catch (err) {
    return { units: 'metric' };
  }
};

const saveSettings = (settings) => {
  try {
    const serializedSettings = JSON.stringify(settings);
    localStorage.setItem('weatherSettings', serializedSettings);
  } catch (err) {
    console.error("Could not save settings:", err);
  }
};

const initialState = loadSettings();

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleUnits: (state) => {
      state.units = state.units === 'metric' ? 'imperial' : 'metric';
      saveSettings(state);
    },
    
  },
});

export const { toggleUnits } = settingsSlice.actions;
export default settingsSlice.reducer;
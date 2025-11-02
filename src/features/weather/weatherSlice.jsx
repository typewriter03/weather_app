// src/features/weather/weatherSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeatherData } from '../../api/weatherApi';

export const fetchWeatherByCity = createAsyncThunk(
  'weather/fetchByCity',
  async (city, { rejectWithValue }) => {
    try {
      const data = await fetchWeatherData(city);
      
      return { data, cityKey: city.toLowerCase() };
    } catch (error) {
      
      return rejectWithValue({ message: error.message, cityKey: city.toLowerCase() });
    }
  }
);

const initialState = {
  dataByCity: {}, 
  
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCity.pending, (state, action) => {
        
        const cityKey = action.meta.arg.toLowerCase();
        
        state.dataByCity[cityKey] = {
          status: 'loading',
          data: null,
          error: null,
          lastFetched: Date.now(),
        };
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        
        const { data, cityKey } = action.payload;
        state.dataByCity[cityKey] = {
          status: 'succeeded',
          data: data,
          error: null,
          lastFetched: Date.now(),
        };
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        
        const { message, cityKey } = action.payload;
        state.dataByCity[cityKey] = {
          status: 'failed',
          data: null,
          error: message,
          lastFetched: Date.now(),
        };
      });
  },
});

export default weatherSlice.reducer;
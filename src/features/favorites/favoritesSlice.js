// src/features/favorites/favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';


const getKey = (authState) => {
  const uid = authState.user?.uid;
  return uid ? `favoriteCities_${uid}` : 'favoriteCities_guest';
};


const loadFavorites = (authState) => {
  const key = getKey(authState);
  try {
    const serializedFavorites = localStorage.getItem(key);
    if (serializedFavorites === null) {
      return key === 'favoriteCities_guest' ? ['london'] : [];
    }
    return JSON.parse(serializedFavorites);
  } catch (err) {
    console.error("Could not load favorites:", err);
    return ['london'];
  }
};


const saveFavorites = (authState, favorites) => {
  const key = getKey(authState);
  try {
    const serializedFavorites = JSON.stringify(favorites);
    localStorage.setItem(key, serializedFavorites);
  } catch (err) {
    console.error("Could not save favorites:", err);
  }
};


const initialState = {
  cities: [],
  status: 'idle', 
};


const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    
    loadUserFavorites: (state, action) => {
      
      const favorites = loadFavorites(action.payload);
      state.cities = favorites;
      state.status = 'loaded';
    },
    
    
    addFavorite: (state, action) => {
      
      const cityLower = action.payload.city.toLowerCase();
      if (!state.cities.includes(cityLower)) {
        state.cities.push(cityLower);
        saveFavorites(action.payload.authState, state.cities);
      }
    },
    
    
    removeFavorite: (state, action) => {
      
      const cityLower = action.payload.cityKey.toLowerCase();
      state.cities = state.cities.filter(city => city !== cityLower);
      saveFavorites(action.payload.authState, state.cities);
    },
  },
});

export const { loadUserFavorites, addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
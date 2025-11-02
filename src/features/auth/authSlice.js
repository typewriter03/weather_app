// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // No user logged in by default
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
    setAuthLoading: (state) => {
      state.status = 'loading';
    },
    
    setUser: (state, action) => {
      state.user = action.payload; 
      state.status = 'succeeded';
    },
    
    clearUser: (state) => {
      state.user = null;
      state.status = 'idle';
    },
  },
});

export const { setAuthLoading, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
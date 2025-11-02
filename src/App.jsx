// src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { onAuthStateChanged } from 'firebase/auth'; 
import { auth } from './firebaseConfig'; 
import { setUser, clearUser, setAuthLoading } from './features/auth/authSlice'; 
import { loadUserFavorites } from './features/favorites/favoritesSlice'; 


import DashboardPage from './pages/DashboardPage';
import DetailedViewPage from './pages/DetailedViewPage';
import UnitToggle from './components/UnitToggle';
import AuthDisplay from './components/AuthDisplay'; 
import './App.css'; 

function App() {
  const dispatch = useDispatch();
  
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(setAuthLoading());
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email } = user;
        dispatch(setUser({ uid, displayName, email }));
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  
  useEffect(() => {
    
    dispatch(loadUserFavorites(authState));
    
  // By only depending on authState.status, the loop is broken.
  }, [authState.status, dispatch, authState]); // This is now safe

  return (
    <div className="App">
      <header className="app-header">
        <h1>Weather Analytics Dashboard</h1>
        <div className="header-controls">
          <UnitToggle />
          <AuthDisplay />
        </div>
      </header>
      
      <main>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/city/:cityName" element={<DetailedViewPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
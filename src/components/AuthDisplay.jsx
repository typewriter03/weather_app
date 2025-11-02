// src/components/AuthDisplay.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebaseConfig'; 
import { setUser, clearUser, setAuthLoading } from '../features/auth/authSlice';

const AuthDisplay = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.auth);

  const handleLogin = async () => {
    dispatch(setAuthLoading());
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { uid, displayName, email } = result.user;
      
      dispatch(setUser({ uid, displayName, email }));
    } catch (error) {
      console.error("Auth Error:", error);
      dispatch(clearUser()); 
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
    } catch (error) {
      console.error("Sign Out Error:", error);
    }
  };

  if (status === 'loading') {
    return <div className="auth-display">Loading...</div>;
  }

  if (user) {
    return (
      <div className="auth-display">
        <span>Welcome, {user.displayName}!</span>
        <button onClick={handleLogout} className="auth-btn logout">Log Out</button>
      </div>
    );
  }

  return (
    <div className="auth-display">
      <button onClick={handleLogin} className="auth-btn login">
        Sign in with Google
      </button>
    </div>
  );
};


export default AuthDisplay;
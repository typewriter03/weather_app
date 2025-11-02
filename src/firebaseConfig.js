// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApJJ-I3I71TcRxxUqtE1S812hJ7lZ6eow",
  authDomain: "weather-dashboard-f8b3d.firebaseapp.com",
  projectId: "weather-dashboard-f8b3d",
  storageBucket: "weather-dashboard-f8b3d.firebasestorage.app",
  messagingSenderId: "579092385523",
  appId: "1:579092385523:web:c9123bd254a249ddcef186",
  measurementId: "G-34W6K5LQMM"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
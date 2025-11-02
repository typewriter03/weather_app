// src/api/firestoreApi.js
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from "../firebaseConfig";

/**
 * @param {string} uid - The user's ID from Firebase Auth.
 * @param {string[]} favorites - The array of city names.
 */
export const saveFavoritesToDB = async (uid, favorites) => {
  
  const userDocRef = doc(db, "users", uid);
  try {
    
    await setDoc(userDocRef, { favorites: favorites }, { merge: true });
  } catch (error) {
    console.error("Error saving favorites:", error);
    throw new Error("Could not save favorites to your account.");
  }
};

/**
 Loads a user's favorites list from their document in Firestore.
  @param {string} uid
  @returns {string[]} 
 */
export const getFavoritesFromDB = async (uid) => {
  const userDocRef = doc(db, "users", uid);
  try {
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      
      return docSnap.data().favorites || [];
    } else {
      
      return [];
    }
  } catch (error) {
    console.error("Error loading favorites:", error);
    throw new Error("Could not load favorites from your account.");
  }
};
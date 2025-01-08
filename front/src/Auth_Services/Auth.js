// src/Auth.js
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from './firebaseConfig';

// Register user
export const register = async (email, password) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;  // Propagate error to handle in UI
  }
};

// Login user
export const login = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;  // Propagate error to handle in UI
  }
};

// Logout user
export const logout = async () => {
  try {
    return await signOut(auth);
  } catch (error) {
    throw error;  // Propagate error to handle in UI
  }
};

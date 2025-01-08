// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBqBmW5b5xDztWmb02xS9IhASpLggETNU0",
  authDomain: "gym-manegement-system-42046.firebaseapp.com",
  projectId: "gym-manegement-system-42046",
  storageBucket: "gym-manegement-system-42046.firebasestorage.app",
  messagingSenderId: "947918115476",
  appId: "1:947918115476:web:6e4e3ea9c92d1f7a275a81",
  measurementId: "G-VEN60W9ZEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export Firebase services for use in the app
export { auth, db, storage };
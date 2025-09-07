// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDk3S7ZyMWF_NMsJQQsS2WO56T8KdTYhe8",
  authDomain: "cloud-kitchen-1e39e.firebaseapp.com",
  projectId: "cloud-kitchen-1e39e",
  storageBucket: "cloud-kitchen-1e39e.appspot.com",
  messagingSenderId: "662546331171",
  appId: "1:662546331171:web:7c6e25d20a3517462d6396",
  measurementId: "G-G4ST38JWJC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore DB
export const db = getFirestore(app);

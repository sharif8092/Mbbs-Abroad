import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWoqLBHDccLU4E5V33l1HUChoh_qsPHnQ",
  authDomain: "mbbs-abroad-portal.firebaseapp.com",
  projectId: "mbbs-abroad-portal",
  storageBucket: "mbbs-abroad-portal.firebasestorage.app",
  messagingSenderId: "895517802093",
  appId: "1:895517802093:web:270e0661b1d75138160964",
  measurementId: "G-X0J7XRXEF1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

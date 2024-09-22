// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-a8691.firebaseapp.com",
  projectId: "mern-estate-a8691",
  storageBucket: "mern-estate-a8691.appspot.com",
  messagingSenderId: "316419526222",
  appId: "1:316419526222:web:6d77450df6e0d1b53bfd1f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
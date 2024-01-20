// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDC1UhUHAiNQ-rwSaYToBtscWSC1MEGm4c",
  authDomain: "booking-cms-1ed3d.firebaseapp.com",
  projectId: "booking-cms-1ed3d",
  storageBucket: "booking-cms-1ed3d.appspot.com",
  messagingSenderId: "936448154563",
  appId: "1:936448154563:web:4faa9eada7a7916e62bb76",
  measurementId: "G-6KD4F0F07X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
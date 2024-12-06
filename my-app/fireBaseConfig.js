// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJ7P5R1F_RuXF8lrXYUR1XApFgtTm5hP0",
  authDomain: "hotel-app-a00bb.firebaseapp.com",
  databaseURL: "https://hotel-app-a00bb-default-rtdb.firebaseio.com",
  projectId: "hotel-app-a00bb",
  storageBucket: "hotel-app-a00bb.firebasestorage.app",
  messagingSenderId: "438921514433",
  appId: "1:438921514433:web:16a03b54e5a8acde43f340",
  measurementId: "G-ZQV7Q5329C"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  })
  // Get Database instance
  const database = getDatabase(app);
  
  export { app, auth, database };
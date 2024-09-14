// src/firebase/Config.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoFY47gzV10Io0lrfIh3UTPdIEq9tqW3E",
  authDomain: "feedback-ed4f2.firebaseapp.com",
  projectId: "feedback-ed4f2",
  storageBucket: "feedback-ed4f2.appspot.com",
  messagingSenderId: "939602608348",
  appId: "1:939602608348:web:7ec97ed13ab57ed31cf419",
  measurementId: "G-NN79CX0HJY"
};

// Initialize Firebase
let app: any;
let analytics: any;
let imageDB: any;

if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  imageDB = getStorage(app);
}

export { app, analytics, imageDB };

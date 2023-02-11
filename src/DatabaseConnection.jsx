import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCC9Z2ulgscnxnBvi6lMQZxl7_MM793PMQ",
    authDomain: "proiect-frontend-ce873.firebaseapp.com",
    projectId: "proiect-frontend-ce873",
    storageBucket: "proiect-frontend-ce873.appspot.com",
    messagingSenderId: "632029626386",
    appId: "1:632029626386:web:a47176191af5bf7f3d58cb",
    measurementId: "G-WE4LBK34VC",
    experimentalForceLongPolling: true
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
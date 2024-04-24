// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBm3Rr4D79Oua1TCYa_o7FHbBsr2KBo6Dw",
  authDomain: "starwars-market.firebaseapp.com",
  databaseURL: "https://starwars-market-default-rtdb.firebaseio.com",
  projectId: "starwars-market",
  storageBucket: "starwars-market.appspot.com",
  messagingSenderId: "105864387416",
  appId: "1:105864387416:web:7f3b2d7cc95791be19632d",
  measurementId: "G-7MFMYZ3QD8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/app";
require('dotenv').config();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "dummy_api",
  authDomain: "generate-shownxt.firebaseapp.com",
  projectId: "generate-shownxt",
  storageBucket: "generate-shownxt.appspot.com",
  messagingSenderId: "1020751547045",
  appId: "1:1020751547045:web:4ca38ad36f616639479b4c",
  measurementId: "G-573TD7VK4V"
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

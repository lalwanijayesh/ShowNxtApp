/*
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "reactnativefirebase-00000.firebaseapp.com",
  databaseURL: "https://reactnativefirebase-00000.firebaseio.com",
  projectId: "reactnativefirebase-00000",
  storageBucket: "reactnativefirebase-00000.appspot.com",
  messagingSenderId: "000000000000000",
  appId: "1:000000000000000:web:000000000000000"
};

firebase.initializeApp(firebaseConfig);

export default firebase;

 */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBI3p1DS9DprLe_wey7-sMUteggJGHZ2kg",
  authDomain: "new-firebase-project-44edc.firebaseapp.com",
  projectId: "new-firebase-project-44edc",
  storageBucket: "new-firebase-project-44edc.appspot.com",
  messagingSenderId: "634397846772",
  appId: "1:634397846772:web:177d459ba8367b2f7982a1",
  measurementId: "G-MY8X2VXGHN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

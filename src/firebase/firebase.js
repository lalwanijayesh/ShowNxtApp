import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCdiT_N4bQEKdKV31nB4M2I1e9_Ogm4yRs",
  authDomain: "generate-shownxt.firebaseapp.com",
  projectId: "generate-shownxt",
  storageBucket: "generate-shownxt.appspot.com",
  messagingSenderId: "1020751547045",
  appId: "1:1020751547045:web:4ca38ad36f616639479b4c",
  measurementId: "G-573TD7VK4V"
};

let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;

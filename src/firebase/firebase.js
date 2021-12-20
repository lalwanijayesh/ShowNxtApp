import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBGBuoRlmsVtUcroBMDIPELzc37l7hMfZ8",
  authDomain: "shownxt-cc3b8.firebaseapp.com",
  projectId: "shownxt-cc3b8",
  storageBucket: "shownxt-cc3b8.appspot.com/videos",
  messagingSenderId: "1075128173840",
  appId: "1:1075128173840:web:b6b2e36dafb556cd475195",
  measurementId: "G-RHFSZGH2F7",
};

let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;

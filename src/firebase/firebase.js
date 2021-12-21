import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBI3p1DS9DprLe_wey7-sMUteggJGHZ2kg",
  authDomain: "new-firebase-project-44edc.firebaseapp.com",
  projectId: "new-firebase-project-44edc",
  storageBucket: "new-firebase-project-44edc.appspot.com",
  messagingSenderId: "634397846772",
  appId: "1:634397846772:web:177d459ba8367b2f7982a1",
  measurementId: "G-MY8X2VXGHN",
};

let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;

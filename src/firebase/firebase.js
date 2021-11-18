import firebase from "firebase";
import { Alert } from "react-native";

const firebaseConfig = {
  // apiKey: "EnterYourApiKeyHere",
  // authDomain: "AuthDomain",
  // projectId: "ProjectId",
  // storageBucket: "StorageBucket",
  // messagingSenderId: "MessagingSenderId",
  // appId: "AppId",
  // measurementId: "MeasurementId"
  apiKey: "AIzaSyCdiT_N4bQEKdKV31nB4M2I1e9_Ogm4yRs",
  authDomain: "generate-shownxt.firebaseapp.com",
  projectId: "generate-shownxt",
  storageBucket: "generate-shownxt.appspot.com",
  messagingSenderId: "1020751547045",
  appId: "1:1020751547045:web:4ca38ad36f616639479b4c",
  measurementId: "G-573TD7VK4V"
};


firebase.initializeApp(firebaseConfig);

export default firebase;

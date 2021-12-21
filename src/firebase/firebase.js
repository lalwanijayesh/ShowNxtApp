import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "ApiKey",
  authDomain: "AuthDomain",
  projectId: "ProjectId",
  storageBucket: "StorageBucket",
  messagingSenderId: "MessagingId",
  appId: "AppId",
  measurementId: "MeasurementId",
};

let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;

import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "EnterYourApiKeyHere",
  authDomain: "AuthDomain",
  projectId: "ProjectId",
  storageBucket: "StorageBucket",
  messagingSenderId: "MessagingSenderId",
  appId: "AppId",
  measurementId: "MeasurementId",
};

let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;

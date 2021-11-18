import firebase from "firebase";
import { Alert } from "react-native";

const firebaseConfig = {
  apiKey: "EnterYourApiKeyHere",
  authDomain: "AuthDomain",
  projectId: "ProjectId",
  storageBucket: "StorageBucket",
  messagingSenderId: "MessagingSenderId",
  appId: "AppId",
  measurementId: "MeasurementId"
};


firebase.initializeApp(firebaseConfig);

export default firebase;

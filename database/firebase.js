import firebase from "firebase";

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

export default firebase

import  firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  };
  // Initialize Firebase
function initFirebase() {
  if(!firebase.apps.length) {
    return firebase.initializeApp(firebaseConfig);
  }
}

const app = initFirebase();
// const fireDb = firebase.initializeApp(firebaseConfig);
// fireDb.database().ref()
export const storage = firebase.storage();
export const database = firebase.database();
export { firebase };
export const auth = app.auth();
export default app;
import firebase from "firebase/app";

const apiKey = import.meta.env.VITE_API_KEY;
const projectId = import.meta.env.VITE_PROJECT_NAME;
const authDomain = `${projectId}.firebaseapp.com`;
const databaseURL = `https://${projectId}.firebaseio.com`;
const storageBucket = `${projectId}.appspot.com`;

const registerFirebase = () =>
  firebase.initializeApp({
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
  });

export default registerFirebase;

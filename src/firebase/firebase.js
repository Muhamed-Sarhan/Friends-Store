import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyABypy940PPUSXwBVzaFASgiQOtyIlikls",
  authDomain: "e-commerce-auth-292cb.firebaseapp.com",
  projectId: "e-commerce-auth-292cb",
  storageBucket: "e-commerce-auth-292cb.appspot.com",
  messagingSenderId: "125791712474",
  appId: "1:125791712474:web:d50671e5b023d512c221e3",
  measurementId: "G-9MJW71R0GW",
});

export const auth = app.auth();
export default app;

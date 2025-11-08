import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAYSoPdLzZSiQVN8E-_IMoT_dWVDuyjwLo",
  authDomain: "calcular-imc-3532e.firebaseapp.com",
  projectId: "calcular-imc-3532e",
  storageBucket: "calcular-imc-3532e.appspot.com",
  messagingSenderId: "440433561288",
  appId: "1:440433561288:web:1409227ae753ef4cd39ffd"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
export const serverTime = firebase.firestore.FieldValue.serverTimestamp;

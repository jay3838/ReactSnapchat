import firebase from 'firebase';



//firbase ma authintioaction jevirite karo evi rite pan
//firrebase database ma rule ma jai write pachi nu nikali ;(semicolon) lagavi save karvu
//firestorage na rules ma jai evuj karvu database rule jevu

const firebaseConfig = {
  apiKey: "AIzaSyANrfYf_h-6y8tZ4V8v2KdontDk8v1NsOk",
    authDomain: "snapchatclone-6c9f7.firebaseapp.com",
    projectId: "snapchatclone-6c9f7",
    storageBucket: "snapchatclone-6c9f7.appspot.com",
    messagingSenderId: "545371053602",
    appId: "1:545371053602:web:7cc63c3b0bc842ffc1f47b",
    measurementId: "G-CY0RCRPTTB"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider()
  const storage = firebase.storage();

  export {auth, provider,db,storage};


import { getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider,onAuthStateChanged, signOut} from 'firebase/auth'
import { FirebaseApp } from '@firebase/app'

import { initializeApp } from "firebase/app";
import {getStorage}  from "firebase/storage"
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {

    apiKey: "AIzaSyCdYYvYs-ZjCRq0pjcfaEua_qvGEmEIGCw",
  
    authDomain: "share-me-a0bdd.firebaseapp.com",
  
    projectId: "share-me-a0bdd",
  
    storageBucket: "share-me-a0bdd.appspot.com",
  
    messagingSenderId: "537551031801",
  
    appId: "1:537551031801:web:518b3fa01e1c2d43858128"
  
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app) 

  export const storage =getStorage(app)


  export const provider= new GoogleAuthProvider();
  export const auth =getAuth();

  export const Signinwithgoogle=()=> signInWithPopup(auth,provider)

  export const Authstatechangelistner = (callback)=>onAuthStateChanged(auth,callback)
  
  


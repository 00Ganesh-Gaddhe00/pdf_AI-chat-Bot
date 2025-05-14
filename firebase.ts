import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCJQOH27ozlMewoCbE6CNfLcphm6LSCWdA",
  authDomain: "pdf-chat-f8ddb.firebaseapp.com",
  projectId: "pdf-chat-f8ddb",
  storageBucket: "pdf-chat-f8ddb.firebasestorage.app",
  messagingSenderId: "362682498466",
  appId: "1:362682498466:web:0b9f2031fb5310483906fb",
  measurementId: "G-ZLP0LNBHD2"
};


  const app = getApps().length===0? initializeApp(firebaseConfig) : getApp();

  const db = getFirestore(app)
  const storage = getStorage(app)

  export {db, storage}
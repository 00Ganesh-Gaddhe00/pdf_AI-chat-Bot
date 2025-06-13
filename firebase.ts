

import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBEq1YAHZnWsHT6zBlnLWO5ViNCJrlQxzk",
  authDomain: "pdf-chat-1d1ac.firebaseapp.com",
  projectId: "pdf-chat-1d1ac",
  storageBucket: "pdf-chat-1d1ac.firebasestorage.app",
  messagingSenderId: "1024338403429",
  appId: "1:1024338403429:web:78fbd4ea3f426cda63268c",
  measurementId: "G-YK71SPGSJ4"
};


  const app = getApps().length===0? initializeApp(firebaseConfig) : getApp();

  const db = getFirestore(app)
  const storage = getStorage(app)

  export {db, storage}
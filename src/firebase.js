import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLx0wBOjKf28skm2vqzYRYZosvEMG-wJg",
  authDomain: "cybersecurity-9cd37.firebaseapp.com",
  projectId: "cybersecurity-9cd37",
  storageBucket: "cybersecurity-9cd37.firebasestorage.app",
  messagingSenderId: "554232437766",
  appId: "1:554232437766:web:0e629902bf1f7d5f2b7787",
  measurementId: "G-YYLGYH49R5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Core services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyD3E1Hl5dRImWq_DwCHYmTtLn6Yqkc2vuI",
  authDomain: "neon-noir-eats-9c421.firebaseapp.com",
  projectId: "neon-noir-eats-9c421",
  storageBucket: "neon-noir-eats-9c421.appspot.com",
  messagingSenderId: "155122864322",
  appId: "1:155122864322:web:daba64137f26189e74ab5b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2Otr5FoFczpjpj7qtcgITnhe2WNE42as",
  authDomain: "shapline-industry.firebaseapp.com",
  projectId: "shapline-industry",
  storageBucket: "shapline-industry.firebasestorage.app",
  messagingSenderId: "6432261402886",
  appId: "1:6432261402886:web:77a092f34b3a11881b622f",
};

const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = null;
export const auth = null;
export default app;

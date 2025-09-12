import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ---------- REPLACE with your Firebase project's config ----------
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};
// ------------------------------------------------------------------

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Collections helpers
export const modulesCollection = collection(db, "modules");
export const studentsCollection = collection(db, "students"); // includes leaderboard info

import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGiU0hQOaVq8PNGdOdyPB9KChRNN5aI30",
  authDomain: "fir-next-f0e7f.firebaseapp.com",
  projectId: "fir-next-f0e7f",
  storageBucket: "fir-next-f0e7f.firebasestorage.app",
  messagingSenderId: "266780873623",
  appId: "1:266780873623:web:d35d0d24c97d779eebead2",
  measurementId: "G-K1NERCDD97",
};

const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, analytics, auth, db };

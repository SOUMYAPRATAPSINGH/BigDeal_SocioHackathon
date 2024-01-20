



// firebase.jsx

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyDFS_QW9T8me0we9seGnhjon8ekwFhCJck",
  authDomain: "eunoiaof-f7cb3.firebaseapp.com",
  projectId: "eunoiaof-f7cb3",
  storageBucket: "eunoiaof-f7cb3.appspot.com",
  messagingSenderId: "770556026966",
  appId: "1:770556026966:web:a6355826bb9634c2c81bf7",
  measurementId: "G-FS9V2R4G5Z"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
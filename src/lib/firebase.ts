import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBDO-h9m4KoJ6C1hxhhgzmT8iBRF5YF9Ho',
  authDomain: 'makelearningfun-88529.firebaseapp.com',
  projectId: 'makelearningfun-88529',
  storageBucket: 'makelearningfun-88529.firebasestorage.app',
  messagingSenderId: '365596901040',
  appId: '1:365596901040:web:e4674b5280ab5c2e6a0575',
  measurementId: 'G-BLRZ9EVHJ3',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

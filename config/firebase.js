// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
<<<<<<< HEAD
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
=======
>>>>>>> 395a5c3dbd52491d3f8b39711e2865c0c1317325

const firebaseConfig = {
  apiKey: 'AIzaSyDZ_ccS9S2dG3PRPUsfZhJruD1q9IUo4q4',
  authDomain: 'life-bridge.firebaseapp.com',
  projectId: 'life-bridge',
  storageBucket: 'life-bridge.appspot.com',
  messagingSenderId: '252614072994',
  appId: '1:252614072994:web:da95a607e121a63f3a15fb',
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
<<<<<<< HEAD
export const db = getFirestore(app);
=======
export default app;
export const db = getFirestore(app);
>>>>>>> 395a5c3dbd52491d3f8b39711e2865c0c1317325

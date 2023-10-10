import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

import {
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    getAuth, 
    signOut, 
    signInWithPopup, 
    GoogleAuthProvider,
    sendPasswordResetEmail
} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTH,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_ID,
  appId: import.meta.env.VITE_APP_ID
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export const db = getFirestore(app)

export const onSignIn = async ({email, password}) => {
    
    try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        return res;
    } catch (error) {
        console.log(error);
    }
    
}

export const onLogOut = () => {
    signOut(auth);
    console.log('cerro');
}

let googleProvider = new GoogleAuthProvider();

export const loginGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        return res
    } catch (error) {
        console.log(error);
    }
}

export const signUp = async ({email, password}) => {
    try {
        let res = await createUserWithEmailAndPassword(auth, email, password)
        return res; //res seria como una confirmacion si esta todo ok 
    } catch (error) {
        console.log(error);
    }
}

export const forgotPassword = async ({email}) => {
    try {
        let res = await sendPasswordResetEmail(auth, email)
        return res;
    } catch (error) {
        console.log(error);
    }
}


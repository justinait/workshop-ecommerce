import { initializeApp } from "firebase/app";

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
  apiKey: "AIzaSyDB-3i8U-3okwHy3bkqGMrPQ1uAsqIogyM",
  authDomain: "cora-cuadernos.firebaseapp.com",
  projectId: "cora-cuadernos",
  storageBucket: "cora-cuadernos.appspot.com",
  messagingSenderId: "850562593577",
  appId: "1:850562593577:web:7fe8513011cd1a3dbd7d38"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

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


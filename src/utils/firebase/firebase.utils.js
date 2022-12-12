// Imports firebase app instance to access firestore
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

import {
    getFirestore,
    doc, 
    getDoc,
    setDoc,

} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCYp8m0OIEMEd_wxpOYVtNr6jOaQzvQ1Jk",
    authDomain: "crwn-db-a39de.firebaseapp.com",
    projectId: "crwn-db-a39de",
    storageBucket: "crwn-db-a39de.appspot.com",
    messagingSenderId: "201444235303",
    appId: "1:201444235303:web:4272bb88e6463aa0bc5602"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider()
  // Setting behavior of auth provider
  googleProvider.setCustomParameters({
    prompt : 'select_account'
  })

  export const auth = getAuth()
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)
  

  export const db = getFirestore()
  
  export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid)
    //console.log(userDocRef)
    const userSnapshot = await getDoc(userDocRef)
    //console.log(userSnapshot)

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth
        const createdAt = new Date()
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo,

            })

        }catch(err){
            console.log(`error creating user, ${err}`)
        }
    }
    return userDocRef
  }


  export const signInUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
  }

  export const signOutUser = async () => signOut(auth)

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)
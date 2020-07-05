import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyBFn7zT6PH_J6wpB1cD0L74yjbKOhhaYJ8",
  authDomain: "twitter-clone-5d03f.firebaseapp.com",
  databaseURL: "https://twitter-clone-5d03f.firebaseio.com",
  projectId: "twitter-clone-5d03f",
  storageBucket: "twitter-clone-5d03f.appspot.com",
  messagingSenderId: "957701663797",
  appId: "1:957701663797:web:4685b9fd514ae6ada5157c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const generateUserDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if(!snapshot.exists) {
    const { email } = userAuth;
    try {
      await userRef.set({
        email,
        ...additionalData
      })
    } catch (error) {
      console.log('Error creating user document', error)
      return error;
    }
  }

  return userRef;
}

export const createUserWithEmailAndPasswordHandler = async (email, password) => {
  try {
    const {user} = await auth.createUserWithEmailAndPassword(email, password);
    generateUserDocument(user);
  } catch(error) {
    console.log('Error signing up with email and password', error);
  }
}

export const signInWithEmailAndPasswordHandler = (email, password) => {
  try {
    auth.signInWithEmailAndPassword(email, password);
  } catch(error) {
    console.log('Error signing in', error);
  }
}
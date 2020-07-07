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

export const generateUserDocument = async (userAuth, additionalData, bio) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if(!snapshot.exists) {
    const { email, displayName } = userAuth;

    try {
      await userRef.set({
        displayName,
        email,
        ...additionalData
      });
    } catch (error) {
      console.log('Error creating user document', error)
    }
  }

  return userRef;
}

// export const createUserWithEmailAndPasswordHandler = async (email, password) => {
//   try {
//     const {user} = await auth.createUserWithEmailAndPassword(email, password);
//     generateUserDocument(user);
//   } catch(error) {
//     console.log('Error signing up with email and password', error);
//   }
// }

export const sendTweet = async (tweet, userId, displayName) => {
  firestore.collection('users').doc(userId).collection('tweets').doc().set({
    text: tweet,
    tweetedAt: new Date(),
    author: userId,
    authorDisplayName: displayName
  })
  .then(resp => resp)
  .catch(error => error);
}

export const getFollowedUsers = async (userId) => {
  if(!userId) return;

  const userFollows = await firestore.collection('users').doc(userId).collection('follows').get();
  return userFollows;
}

export const getTweetsByUser = async (userId) => {
  if(!userId) return;

  const tweets = await firestore.collection('users').doc(userId).collection('tweets').get();
  return tweets;
}

export const listAllUsers = async () => {
  const userSnapshot = await firestore.collection('users').get();

  return userSnapshot;
}

export const doesUserFollow = async (currentUserId, followedId) => {
  if(!currentUserId || !followedId) return;

  const userFollowsSnapshot = await firestore.collection('users').doc(currentUserId).collection('follows').get();

  let followedUsers = [];

  userFollowsSnapshot.docs.forEach(doc => {
    const followedUser = doc.data().follows;

    followedUsers.push(followedUser);    
  })
  
  const matchingUser = followedUsers.find(followedUser => followedUser === followedId);
  return matchingUser;
}

export const followUser = async (followerId, followedId) => {
  if (followerId === followedId) return;

  if(followedId) {
    firestore.collection('users').doc(followedId).collection('followedBy').doc(followerId).set({
      followedBy: followerId,
      followedSince: new Date()
    })

    firestore.collection('users').doc(followerId).collection('follows').doc(followedId).set({
      follows: followedId
    })

    return true;
  } else {
    return false;
  }
}

export const unfollowUser = async (followerId, followedId) => {
  if (followerId === followedId) return;
  

  if(followedId) {
    firestore.collection('users').doc(followedId).collection('followedBy').doc(followerId).delete()

    firestore.collection('users').doc(followerId).collection('follows').doc(followedId).delete()

    return false;
  } else {
    return true;
  }
}

export const getUserProfile = async (userId) => {
  if(!userId) return;

  const userSnapshot = await firestore.collection('users').doc(userId).get();

  return userSnapshot.data();
}
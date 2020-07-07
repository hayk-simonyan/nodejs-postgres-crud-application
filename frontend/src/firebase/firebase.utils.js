import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyA8lPPhGHH7-6etvrYOC_F6KeCBswJvnZw',
  authDomain: 'cars-d3dda.firebaseapp.com',
  databaseURL: 'https://cars-d3dda.firebaseio.com',
  projectId: 'cars-d3dda',
  storageBucket: 'cars-d3dda.appspot.com',
  messagingSenderId: '199801000805',
  appId: '1:199801000805:web:ae60bef016ece3242a078c',
};

export const createUserProfileDocument = async (userAuth, data) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`/users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ displayName, email, createdAt, ...data });
    } catch (error) {
      console.log(error);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

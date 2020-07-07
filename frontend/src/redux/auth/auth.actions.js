import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

import {
  signInWithGoogle,
  createUserProfileDocument,
} from '../../firebase/firebase.utils';
import { auth } from '../../firebase/firebase.utils';
import {
  USER_LOADED,
  AUTH_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
} from './auth.types';

export const signin = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await signInWithGoogle();

    await auth.onAuthStateChanged(async (user) => {
      const userRef = await createUserProfileDocument(user);
      const userHashId = userRef.id;
      userRef.onSnapshot(async (userSnapshot) => {
        const userEmail = userSnapshot.data().email;

        const body = JSON.stringify({ userEmail, userHashId });

        const res = await axios.post('/auth', body, config);

        dispatch({
          type: SIGNIN_SUCCESS,
          payload: res.data,
        });

        dispatch(loadUser(userEmail));
      });
    });
  } catch (err) {
    dispatch({
      type: SIGNIN_FAIL,
    });
  }
};

export const loadUser = (userEmail) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`/auth/${userEmail}`);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

import { handleActions } from "redux-actions";
import Immutable from "immutable";
import {
  SET_TOKEN,
  LOGIN,
  LOGIN_FAILURE,
  REFRESH_TOKEN,
  REFRESH_TOKEN_FAILURE,
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from '../actions/user';

const initalState = Immutable.fromJS({
  auth: {
    loading: false,
    error: null,
    token: {
      auth_token: null,
      refresh_token: null,
      exp_time: null
    }
  },
  signup: {
    loading: false,
    success: null,
    error: null
  }
});

export default handleActions({
  [SET_TOKEN] (userState, { payload }) {
    let token = Immutable.fromJS(payload);
    let auth = initalState.get('auth').set('token', token);
    return userState.set('auth', auth);
  },
  [LOGIN] (userState) {
    let auth = initalState.get('auth').set('loading', true);
    return userState.set('auth', auth);
  },
  [LOGIN_FAILURE] (userState, {payload}) {
    let auth = initalState.get('auth').set('error', payload);
    return userState.set('auth', auth);
  },
  [SIGNUP] (userState) {
    let signup = initalState.get('signup').set('loading', true);
    return userState.set('signup',signup);
  },
  [SIGNUP_SUCCESS] (userState) {
    let signup = initalState.get('signup').set('success', true);
    return userState.set('signup',signup);
  },
  [SIGNUP_FAILURE] (userState, {payload}) {
    let signup = initalState.get('signup').set('error', payload);
    return userState.set('signup', signup);
  }
},
initalState
);


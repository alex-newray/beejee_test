import { URLS, LOCALSTORE_KEYS, TOKEN_TIMEOUT } from '../consts'; 
import { timestamp, getUrl } from '../utils';

export const LOGIN_SET_FIELD = 'LOGIN_SET_FIELD';

const _set = (key, value) => {
    return {
        type: LOGIN_SET_FIELD,
        key: key,
        value: value,
      }
}

export const showLoginModal = () => {
  return(dispatch, getState) => {
    dispatch(_set('username', ''));
    dispatch(_set('password', ''));
    dispatch(_set('open', true));
  }
}

export const hideLoginModal = () => {
  return(dispatch, getState) => {
    dispatch(_set('open', false));
  }
}

export const updateLoginField = (key, value) => {
  return(dispatch, getState) => {
    dispatch(_set(key, value));
  }
}

export const logout = () => {
  return(dispatch, getState) => {
    localStorage.removeItem(LOCALSTORE_KEYS.TOKEN);
    localStorage.removeItem(LOCALSTORE_KEYS.TOKEN_EXPIRED);
    dispatch(_set('token', null));
    dispatch(_set('tokenExpired', null));
  }
}

export const sendLoginForm = () => {
  return(dispatch, getState) => {
    const login = getState().login;
    dispatch(_set('loading', true));
    dispatch(_set('message', {}));

    let formData = new FormData();
    formData.append('username', login.username);
    formData.append('password', login.password);

    fetch( getUrl(URLS.LOGIN, 'POST'), {
      'method':'POST',
      body: formData,
    })
    .then(response => response.json())
    .then((result) => {
      dispatch(_set('loading', false));
      if (result.status === 'ok'){
        dispatch(setAuth(result.message.token));
        dispatch(hideLoginModal());
      } else {
        dispatch(_set('message', result.message))
      }
    })
    .catch(()=>{
      dispatch(_set('loading', false));
    })

  }
}

const setAuth = (token) => {
  return (dispatch, getState) => {
    const now = timestamp();
    localStorage.setItem(LOCALSTORE_KEYS.TOKEN, token);
    localStorage.setItem(LOCALSTORE_KEYS.TOKEN_EXPIRED, now);
    dispatch(_set('token', token));
    dispatch(_set('tokenExpired', now));
  }
}

export const checkAuth = () => {
  return (dispatch, getState) => {
    const token = localStorage.getItem(LOCALSTORE_KEYS.TOKEN);
    const tokenExpired = localStorage.getItem(LOCALSTORE_KEYS.TOKEN_EXPIRED);

    if (token && tokenExpired){
      if (timestamp() < (Number(tokenExpired) + TOKEN_TIMEOUT)){
        dispatch(_set('token', token));
        dispatch(_set('tokenExpired', Number(tokenExpired)));
        return;
      }
    };
    localStorage.removeItem(LOCALSTORE_KEYS.TOKEN);
    localStorage.removeItem(LOCALSTORE_KEYS.TOKEN_EXPIRED);
    dispatch(_set('token', null));
    dispatch(_set('tokenExpired', null));
  }
}


import { URLS } from '../consts'; 
import { getUrl } from '../utils';
import { defaultState } from '../default'

import { fetchTasks } from './tasks';
import { showNotificationModal } from './notification';

export const CREATE_SET_FIELD = 'CREATE_SET_FIELD';


const _set = (key, value) => {
  return {
      type: CREATE_SET_FIELD,
      key: key,
      value: value,
    }
}

export const hideCreateTaskModal = () => {
  return(dispatch, getState) => {
    dispatch(_set('open', false));
  }
}


export const showCreateTaskModal = () => {
  return(dispatch, getState) => {
    dispatch(_set('username', defaultState.create.username));
    dispatch(_set('email', defaultState.create.email));
    dispatch(_set('text', defaultState.create.text));
    dispatch(_set('open', true));
  }
}

export const updateCreateFormField = (key, value) => {
  return(dispatch, getState) => {
    dispatch(_set(key, value));
  }
}


export const createTask = () => {
  return(dispatch, getState) => {
    const create = getState().create;
    dispatch(_set('loading', true));
    dispatch(_set('message', {}));

    let formData = new FormData();
    formData.append('username', create.username);
    formData.append('email', create.email);
    formData.append('text', create.text);

    fetch( getUrl(URLS.CREATE, 'POST'), {
      'method':'POST',
      body: formData,
    })
    .then(response => response.json())
    .then((result) => {
      dispatch(_set('loading', false));
      if (result.status === 'ok'){
        dispatch(hideCreateTaskModal());
        dispatch(fetchTasks());
        dispatch(showNotificationModal('Successfully'));
      } else {
        dispatch(_set('message', result.message))
      }
    })
    .catch(()=>{
      dispatch(_set('loading', false));
    })
  }
}
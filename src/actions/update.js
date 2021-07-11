import format from 'string-format';
import { URLS } from '../consts'; 
import { getUrl } from '../utils';

import { fetchTasks } from './tasks';
import { checkAuth } from './login';
import { showNotificationModal } from './notification';

export const UPDATE_SET_FIELD = 'UPDATE_SET_FIELD';

const _set = (key, value) => {
  return {
      type: UPDATE_SET_FIELD,
      key: key,
      value: value,
    }
}

export const hideUpdateTaskModal = () => {
  return(dispatch, getState) => {
    dispatch(_set('open', false));
  }
}

export const showUpdateTaskModal = (task) => {
  return(dispatch, getState) => {
    dispatch(_set('text', task.text));
    dispatch(_set('status', task.status));
    dispatch(_set('task_id', task.id));
    dispatch(_set('open', true));
  }
}

export const updateUpdateFormField = (key, value) => {
  return(dispatch, getState) => {
    dispatch(_set(key, value));
  }
}

export const updateTask = () => {
  return(dispatch, getState) => {
    const update = getState().update;

    let formData = new FormData();
    formData.append('text', update.text);
    formData.append('status', Number(update.status));

    dispatch(checkAuth());
    const token = getState().login.token;
    if (token){
      formData.append('token', token);
    } else {
      dispatch(showNotificationModal('Access denied! Token not found!'));
      return;
    }

    dispatch(_set('loading', true));
    dispatch(_set('message', {}));

    const url = format(URLS.EDIT, update.task_id);
    fetch( getUrl(url, 'POST'), {
      'method':'POST',
      body: formData,
    })
    .then(response => response.json())
    .then((result) => {
      dispatch(_set('loading', false));
      console.log(result);
      if (result.status === 'ok'){
        dispatch(hideUpdateTaskModal());
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
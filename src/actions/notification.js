export const NOTIFICATION_SET_FIELD = 'NOTIFICATION_SET_FIELD';

const _set = (key, value) => {
    return {
        type: NOTIFICATION_SET_FIELD,
        key: key,
        value: value,
      }
}

export const showNotificationModal = (message) => {
  return(dispatch, getState) => {
    dispatch(_set('message', message));
    dispatch(_set('open', true));
  }
}

export const hideNotificationModal = () => {
  return(dispatch, getState) => {
    dispatch(_set('open', false));
  }
}
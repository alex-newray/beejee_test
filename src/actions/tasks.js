//import { Url, URLSearchParams } from 'url';
import { URLS } from '../consts'; 
import { getUrl } from '../utils';

export const TASKS_SET_FIELD = 'TASKS_SET_FIELD';

const _set = (key, value) => {
  return {
      type: TASKS_SET_FIELD,
      key: key,
      value: value,
    }
}

export const setPage = (page) => {
  return(dispatch, getState) => {
    dispatch(_set('page', page));
    dispatch(fetchTasks());
  }
}

export const setSorting = (field) => {
  return(dispatch, getState) => {
    const tasks = getState().tasks;
    if (field === tasks.sortField){
      const newDirection = tasks.sortDirection==='asc' ? 'desc' : 'asc';
      dispatch(_set('sortDirection', newDirection));
    } else {
      dispatch(_set('sortField', field));
      dispatch(_set('sortDirection', 'asc'));
    }
    dispatch(fetchTasks());
  }
}

export const fetchTasks = () => {
  return(dispatch, getState) => {
    const tasks = getState().tasks;
    const params = {
      sort_field: tasks.sortField,
      sort_direction: tasks.sortDirection,
      page: tasks.page,
    };
    dispatch(_set('records', []));
    fetch( getUrl(URLS.TASKS, 'GET', params) )
    .then(response => response.json())
    .then((result) => {
      if (result.status === 'ok'){
        dispatch(_set('records', result.message.tasks ));
        dispatch(_set('pages', result.message.total_task_count ));
      }
    })
  }
}
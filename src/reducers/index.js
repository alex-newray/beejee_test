import { combineReducers } from 'redux';
import login from './login';
import tasks from './tasks';
import create from './create';
import update from './update';
import notification from './notification';

export default combineReducers({
    login, 
    tasks, 
    create,
    update,
    notification,
});
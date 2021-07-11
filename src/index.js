import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import Application from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';

import { checkAuth } from './actions/login';
import { fetchTasks } from './actions/tasks';

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('root')
);

store.dispatch(checkAuth());
store.dispatch(fetchTasks());
reportWebVitals();

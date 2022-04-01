import React from 'react';
import ReactDOM from 'react-dom';
import {Router as BrowserRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import App from './components/app/app';
import { createAPI } from './api';
import { fetchGuitars } from './store/api-action';
import { rootReducer } from './store/root-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = createAPI();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

const browserHistory = createBrowserHistory();

store.dispatch(fetchGuitars('', ''));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <App />
      </BrowserRouter>
    </Provider>
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root'),
);

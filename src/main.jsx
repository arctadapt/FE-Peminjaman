import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SnackbarProvider from './components/SnackbarProvider';
import { Provider } from 'react-redux';
import store from './app/store';

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SnackbarProvider from './components/SnackbarProvider';

ReactDOM.render(
  <SnackbarProvider>
    <App />
  </SnackbarProvider>,
  document.getElementById("root")
);
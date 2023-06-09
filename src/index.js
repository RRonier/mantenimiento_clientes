import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { Router } from "./components/Router"
import { RouterProvider } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from './context/auth.context';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={1} autoHideDuration={2000}>
      <AuthProvider>
        <RouterProvider router={Router}>
          <App />
        </RouterProvider>
      </AuthProvider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

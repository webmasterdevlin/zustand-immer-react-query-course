/* eslint-disable @typescript-eslint/no-empty-function */
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

if (import.meta.env.MODE === 'production') {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

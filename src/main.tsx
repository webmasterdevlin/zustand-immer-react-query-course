import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

if (import.meta.env.MODE === 'production') {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

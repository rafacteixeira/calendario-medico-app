import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from "./components/routes/AppRouter";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter/>
  </React.StrictMode>
);

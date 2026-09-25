// src/main.jsx
// App entry point: wires Router + context providers around <App />.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { PlacementProvider } from './context/PlacementContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PlacementProvider>
          <App />
        </PlacementProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

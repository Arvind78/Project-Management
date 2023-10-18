// Import necessary libraries and components from React
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Import the main App component
import './index.css'; // Import styles for the application
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing

// Use ReactDOM.createRoot() to render the application inside the 'root' element
ReactDOM.createRoot(document.getElementById('root')).render(
  // Wrap the entire application inside <React.StrictMode> for additional checks and warnings during development
  <React.StrictMode>
    {/* Use BrowserRouter to enable routing for the application */}
    <BrowserRouter>
      {/* Render the main App component, which contains the entire application logic */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

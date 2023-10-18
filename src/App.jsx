import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './components/login/Login.jsx';
import UserDashboardPage from './components/dashbaordMenu/DashboardSection.jsx'; // Corrected typo in folder name
import NotFoundPage from './components/error/NotFoundPage.jsx';

 
const App = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = sessionStorage.getItem('userToken');

  // Effect to handle user authorization and redirection
  useEffect(() => {
    if (user) {
      // If user token exists, redirect to the dashboard
      navigate('/dashboard');
    } else {
      // If user token does not exist, set error message and redirect to the home page after 5 seconds
      setError('User not authorized');
      const redirectTimer = setTimeout(() => {
        navigate('/');
      }, 3000);

      // Clear the timer when the component is unmounted
      return () => clearTimeout(redirectTimer);
    }
  }, [user, navigate]); // Dependency array ensures the effect runs only when user or navigate changes

  return (
    <Routes>
      {/* Route for the login page */}
      <Route path="/" element={<LoginPage />} />
      {/* Route for the user dashboard */}
      {user && <Route path="/dashboard" element={<UserDashboardPage />} />}
      {/* Route for handling 404 errors */}
      <Route path="*" element={<NotFoundPage error={error} />} />
    </Routes>
  );
};

export default App;

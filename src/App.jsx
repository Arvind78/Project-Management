import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NotFoundPage from './components/error/NotFoundPage.jsx';
import UserDashboardPage from './components/dashboardMenu/DashboardSection.jsx'; // Corrected typo in folder name
import styles from './App.module.css'; // Import the CSS module

const LazyLoginPage = lazy(() => import('./components/login/Login.jsx'));

const App = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true); // State to control loading visibility
  const navigate = useNavigate();
  const user = sessionStorage.getItem('userToken');

  // Simulate loading delay for demonstration purposes (remove this in your actual code)
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulated loading time: 2 seconds

    return () => clearTimeout(loadingTimeout); // Clear timeout on component unmount
  }, []);

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
      }, 5000); // Redirect time: 5 seconds

      // Clear the timer when the component is unmounted
      return () => clearTimeout(redirectTimer);
    }
  }, [user, navigate]); // Dependency array ensures the effect runs only when user or navigate changes

  return (
    <div>
      {/* Loading progress meter */}
      {isLoading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingIcon}>
            {/* Add your custom loading icon or animation here */}
            Loading...
          </div>
        </div>
      )}

      {/* Routes */}
      <Routes>
        {/* Route for the login page with lazy loading and loading fallback */}
        <Route path="/" element={<Suspense fallback={null}><LazyLoginPage /></Suspense>} />
        {/* Route for the user dashboard */}
        {user && <Route path="/dashboard" element={<UserDashboardPage />} />}
        {/* Route for handling 404 errors */}
        <Route path="*" element={<NotFoundPage error={error} />} />
      </Routes>
    </div>
  );
};

export default App;

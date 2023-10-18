import React from 'react';
import styles from './NotFoundPage.module.css'; // Import CSS Modules styles
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = ({ error }) => {
  const navigate = useNavigate(); // useNavigate hook from react-router-dom for navigation

  // Render the component
  return (
    <div className={styles.errorContainer}>
      {/* Display error message, default to "404 Not Found" if no error prop is provided */}
      <h1 className={styles.errorHeading}>{error || '404 Not Found'}</h1>
      <p className={styles.errorMessage}>Oops! The page you are looking for does not exist.</p>
      {/* Redirect button, onClick navigates back to the home page */}
      <Button type='primary' style={{ margin: '10px 0px' }} onClick={() => navigate('/')}>
        Redirect
      </Button>
    </div>
  );
};

export default NotFoundPage;

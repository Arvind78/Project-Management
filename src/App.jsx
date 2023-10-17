import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./components/login/Login.jsx";
import UserDashboardPage from './components/dashbaordMenu/DashboardSection.jsx';

/**
 * Main application component defining the routes and corresponding components.
 * @returns {JSX.Element} - Rendered React component.
 */
const App = () => {

  // navigate use to redireact of the next routes
  const nevigate = useNavigate();
  const user = sessionStorage.getItem("userToken");


  useEffect(() => {
    if (user) return nevigate("/dashboard")
  }, [])

  return (
    <Routes>
      {/* Route for the login page */}
      <Route path='/' element={<LoginPage />} />

      {/* Route for the user dashboard  */}
     { (user===true)?  <Route path='/dashboard' element={<UserDashboardPage />}/>:  alert("User not authorized")}

    </Routes>
  );
};

export default App;

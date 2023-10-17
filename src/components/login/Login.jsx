import React, { useState } from 'react';
import styles from './Login.module.css'; // Import meaningful variable names for imported CSS modules
import logo from '../../assets/Logo.svg';
import { Input } from 'antd';
import axios  from "axios"
import { useNavigate } from 'react-router-dom';
const Login = () => {

  // navigate use to redireact of the next routes
  const nevigate = useNavigate();

  // Initial form state
  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  // Form error states and initial message
  const [formErrors, setFormErrors] = useState({
    email: null,
    password: null,
    loginStatus: "Welcome! Please login to get started.", // Initial login status message
    status:null
  });

  // Handle input value changes
  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setFormErrors({
      email:null,
      password:null,
      status:null,
      loginStatus:null
    })
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    // Perform form validation and submit data if valid
    if (input.email === null || input.email === "") {
      setFormErrors({
        email: "Email is required !"
      })
      return false;
    }
    if (!emailRegex.test(input.email)) {
      setFormErrors({
        email: "Email is not valid !"
      })
      return false;
    }
    if (input.password===null || input.password ==="") {
      setFormErrors({
        password: "Password is required !"
      })
      return false;
    }

    // user login http request
    axios.post('http://localhost:8080/api/userlogin',
    {email:input.email,password:input.password})
    .then((res)=>{
     setFormErrors({
      loginStatus:res.data.message,
      status:res.data.success
     })
     sessionStorage.setItem("userToken",res.data.userToken)
     nevigate("/dashboard")
    }).catch((err)=>{
      setFormErrors({
        loginStatus:err.response?.data?.message,
        status:err.response?.data?.success
       })
    });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}></div>
      <div className={styles.loginContainer}>
        <div className={styles.formContainer}>
          <div className={styles.formLogo}>
            <img src={logo} alt="Logo" />
            <p className={styles.logoHeading}>Online Project Management</p>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formHeading}>
              <h3>Login to get started</h3>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                Email
              </label>
              <input
                type="text"
                name="email"
                value={input.email}
                className={formErrors.email ? styles.errorFormInput : styles.formInput}
                placeholder="Enter your email"
                onChange={handleInput}
              />
              {formErrors.email && <p className={styles.error}>{formErrors.email}</p>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>
                Password
              </label>
              <Input.Password
                name="password"
                value={input.password}
                className={formErrors.password ? styles.errorFormInput : styles.formInputPassword}
                placeholder="Enter your password"
                onChange={handleInput}
              />
              {formErrors.password && <p className={styles.error}>{formErrors.password}</p>}
            </div>

            <div className={styles.formGroup}>
              <a href="#" className={styles.forgetPassword}>
                Forgot Password?
              </a>
            </div>
            <div className={styles.formGroupBtn}>
              <button type="submit" className={styles.submitButton}>
                Login
              </button>
            </div>
          </form>
          {formErrors.loginStatus && <p style={{color:(formErrors.status==true)?"green"
             :(formErrors.status==false)?"red":"black"}}
           className={styles.errorStatus}>{formErrors.loginStatus}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;

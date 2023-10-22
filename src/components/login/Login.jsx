import React, { useId, useState } from 'react';
import styles from './Login.module.css'; // Import meaningful variable names for imported CSS modules
import logo from '../../assets/Logo.svg';
import { Alert, Button, Input, notification } from 'antd';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
const Login = () => {

  // navigate use to redireact of the next routes
  const nevigate = useNavigate();
  const [loading, setLoading] = useState(false)

  // Initial form state
  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  // Form error states and initial message
  const [formErrors, setFormErrors] = useState({
    email: null,
    password: null,
    loginStatus:null, // Initial login status message
    status: null
  });

  // Handle input value changes
  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setFormErrors({
      email: null,
      password: null,
      status: null,
      loginStatus: null
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
    if (input.password === null || input.password === "") {
      setFormErrors({
        password: "Password is required !"
      })
      return false;
    }

    // user login http request
    setLoading(true)
    axios.post('https://project-manegement.onrender.com/api/userlogin',
      { email: input.email, password: input.password })
      .then((res) => {
        setFormErrors({
          loginStatus: res.data.message,
          status: res.data.success
        })
        setLoading(false)
        sessionStorage.setItem("userToken", res.data.userToken)
        nevigate("/dashboard")
      }).catch((err) => {
        setFormErrors({
          loginStatus: err.response?.data?.message,
          status: err.response?.data?.success
        })
        setLoading(false)

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
              <label style={formErrors.email &&{color:"red"}} htmlFor="email" className={styles.formLabel}>
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
              <label style={formErrors.password &&{color:"red"}} htmlFor="password" className={styles.formLabel}>
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

              <Popup />

            </div>
            <div className={styles.formGroupBtn}>
              <button type="submit" className={styles.submitButton}>
                {(loading) ? "Loading..." : "Login"}
              </button>

            </div>

          </form>

        </div>
        {formErrors.loginStatus && <p style={{
          color: (formErrors.status == true) ? "green"
            : (formErrors.status == false) ? "red" : "black"
        }}
          className={styles.errorStatus}>{formErrors.loginStatus}</p>}
      </div>
    </div>
  );
};

export default Login;



const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState("");
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleForgetPassword = () => {
    if (!userId) {
      if (email === null || email === "") {
        api.error({
          placement: "top",
          message: "Ragisterd Email Is Required ",
          description: "Please enter Ragisterd email"

        })
        return false
      }
      setLoading(true)
      axios.post("https://project-manegement.onrender.com/api/forget", { email }).then((res) => {
        setMessage(res.data.message)
        setUserId(res.data.userId)
        setLoading(false)

      }).catch((err) => {
        setLoading(false)

        throw err

      })

    } else {
      if (newPassword === "" || newPassword === null) {
        api.error({
          placement: "top",
          message: "New Password Is Required ",
          description: "Please enter new password"

        })
        return false
      }

      if (confirmPassword === "" || confirmPassword === null) {
        api.error({
          placement: "top",
          message: "Confirm Password Is Required ",
          description: "Please enter confirm password"

        })
        return false
      }
      if (newPassword !== confirmPassword) {
        api.error({
          placement: "top",
          message: "Confirm Password Doesn't Match",
          description: "Please enter re-confirm password"

        })
        return false
      }


      else {
        setLoading(true)

        axios.post("https://project-manegement.onrender.com/api/forget", { userId, newPassword }).then((res) => {
          api.success({
            placement: "top",
            message: "Reset password Success",
            description: res.data.message
          })
          setLoading(false)
        }).catch((err) => {
          api.error({
            placement: "top",
            message: "Ragiter",
            description: err.response?.data?.message
          })
          setLoading(false)
          throw err
        })
      }
      // reset the all fields
      setMessage("");
      setUserId("");
      setEmail("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }

  return (
    <div className={styles.popupContainer}>
      <a style={{ cursor: "pointer" }} onClick={togglePopup} className={styles.forgetPassword}>
        Forgot Password?
      </a>
      {contextHolder}
      {isOpen && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <span className={styles.closeButton} onClick={togglePopup}>
              &times;
            </span>
            <p >Forget Password</p>

            <div className={styles.forgetContainer}>
              {(!userId) ?
                <div className={styles.emailGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                : <div>
                  <div className={styles.emailGroup}>
                    <Alert type="success" message={message} showIcon />
                  </div>
                  <div className={styles.emailGroup}>
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                    />
                  </div>

                  <div className={styles.emailGroup}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                  </div>
                </div>}
            </div>

            <div className={styles.forgetBtn}>
              <Button type="primary" danger onClick={togglePopup}>
                Close
              </Button>
              <Button type="primary" onClick={handleForgetPassword}>{(userId) ? (loading) ? "Loading..." : "Forget Now" : (loading) ? "Loading..." : "Verify"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};






import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import styles from './DashboardSection.module.css';
import Dashboard from '../dashboard/Dashboard.jsx';
import AddProject from '../newProject/AddProject.jsx';
import ShowProject from '../showProject/ShowProject.jsx';
import logo from '../../assets/Logo.svg';
import arrow from '../../assets/back arrow.svg';
import dashActive from '../../assets/Dashboard-active.svg';
import dashImg from '../../assets/Dashboard.svg';
import projectActive from '../../assets/Project-list-active.svg';
import project from '../../assets/Project-list.svg';
import createActive from '../../assets/create-project-active.svg';
import create from '../../assets/create-project.svg';

import logOut from '../../assets/Logout.svg'
import logOut2 from '../../assets/Logout2.svg'

const DashboardSection = () => {
  const navigate = useNavigate();
  const [path, setPath] = useState('dashboard');
  const [windowWidth, setWindowWidth] = useState("")

  const [title, setTitle] = useState('dashboard');

  useEffect(() => {

    setInterval(() => {
      setWindowWidth(window.innerWidth)
    }, 0);

  }, [windowWidth]);

  // Handle menu item click
  const handleMenu = (currentPath, title) => {
    setPath(currentPath);
    setTitle(title);
  };

  // Handle logout
  const handleLogout = () => {

    // Perform logout logic here, such as clearing user session, etc.
    sessionStorage.removeItem('userToken');
    navigate('/');

  };

  return (
    <div className={styles.DashboardSection}>

      <div className={styles.sideMenuSection}>
        <div className={styles.sidelogo}>

        </div>
        <div className={styles.sideMenu}>
          <div id='one' style={
            (windowWidth > 800) ?
              { borderLeft: (path === 'dashboard') && "5px solid #04559f", borderRadius: "3px" }
              : { borderBottom: (path === 'dashboard') && "5px solid #04559f", borderRadius: "3px" }

          } onClick={() => handleMenu('dashboard', 'Dashboard')}>
            {path === 'dashboard' ? (
              <img src={dashActive} size={35} color='#1475cf' />
            ) : (
              <img src={dashImg} size={35} color='#1475cf' />

            )}

          </div>

          <div id='two' style={
            (windowWidth > 800) ?
              { borderLeft: (path === 'showProject') && "5px solid #04559f", borderRadius: "3px" }
              :
              { borderBottom: (path === 'showProject') && "5px solid #04559f", borderRadius: "3px" }
          } onClick={() => handleMenu('showProject', 'Project List')}>
            {path === 'showProject' ? (
              <img src={projectActive} size={35} color='#1475cf' />
            ) : (
              <img src={project} size={35} color='#1475cf' />

            )}

          </div>
          <hr />
          <div id="three" style={
            (windowWidth > 800) ?
              { borderLeft: (path === 'newProject') && "5px solid #04559f", borderRadius: "3px" }
              :
              { borderBottom: (path === 'newProject') && "5px solid #04559f", borderRadius: "3px" }

          } onClick={() => handleMenu('newProject', 'Create Project')}>
            {path === 'newProject' ? (
              <img src={createActive} size={35} color='#1475cf' />
            ) : (
              <img src={create} size={35} color='#1475cf' />

            )}

          </div>

        </div>
        <div
          style={
            (windowWidth > 800) ?
              { display: "block" }
              :
              { display: "none" }

          }
          className={styles.logoutSection} onClick={handleLogout}>

          <img src={logOut} size={35} color='#1475cf' />

        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.contentHeader}>
          <div className={styles.contentHeaderTitle}>
            <img src={arrow} alt='' />
            <span  className={styles.pageTitle} style={{textTransform:"capitalize",fontWeight:600}}>{title}</span>
          </div>

          <div className={styles.contentHeaderLogo}>
            <img src={logo} />
          </div>
          <div className={styles.contentHeaderLogot}>
            <img src={logOut2} style={{ height: "100%", width: "100%", color: "-moz-initial", cursor: "pointer" }} onClick={handleLogout} />

          </div>
        </div>
        <div className={styles.content}>
          <div>{path === 'dashboard' && <Dashboard />}</div>
          <div>{path === 'showProject' && <ShowProject />}</div>
          <div>{path === 'newProject' && <AddProject />}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;

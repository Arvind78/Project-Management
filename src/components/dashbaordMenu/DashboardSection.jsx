import React, { useState } from 'react';
import { Menu } from 'antd';
import { AiFillDashboard, AiFillPlusCircle, AiOutlineDashboard, AiOutlinePlusCircle } from 'react-icons/ai';
import { IoListCircleSharp, IoListCircleOutline } from 'react-icons/io5';
import { HiOutlineLogout } from 'react-icons/hi';
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
const DashboardSection = () => {
  const navigate = useNavigate();
  const [path, setPath] = useState('dashboard');
  const [title, setTitle] = useState('dashboard');

  // Handle menu item click
  const handleMenu = (currentPath, title) => {
    setPath(currentPath);
    setTitle(title);
  };

  // Handle logout
  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      // Perform logout logic here, such as clearing user session, etc.
      sessionStorage.removeItem('userToken');
      navigate('/');
    }
  };

  return (
    <div className={styles.DashboardSection}>
      <div className={styles.sideMenuSection}>
        <div className={styles.sideMenu}>
          <div onClick={() => handleMenu('dashboard', 'dashboard')}>
            {path === 'dashboard' ? (
              <img src={dashActive}  size={35} color='#1475cf' />
            ) : (
              <img src={dashImg}  size={35} color='#1475cf' />
     
            )}
            
          </div>
          
          <div onClick={() => handleMenu('showProject', 'Project List')}>
            {path === 'showProject' ? (
             <img src={projectActive}  size={35} color='#1475cf' />
             ) : (
               <img src={project}  size={35} color='#1475cf' />
      
            )}
      
          </div>
          <hr  />
          <div onClick={() => handleMenu('newProject', 'Create Project')}>
            {path === 'newProject' ? (
              <img src={createActive}  size={35} color='#1475cf' />
              ) : (
                <img src={create}  size={35} color='#1475cf' />
       
            )}
         
          </div>
          <div className={styles.logoutSection} onClick={handleLogout}>
  
            <img src={logOut}  size={35} color='#1475cf' />
        
          </div>
        </div>
      </div>
      <div className={styles.contentSection}>
        <div className={styles.contentHeader}>
          <div className={styles.contentHeaderTitle}>
            <img src={arrow} alt='' />
            <span>{title}</span>
          </div>
          <div className={styles.contentHeaderLogo}>
           
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

import React, { useEffect, useState } from 'react';
import styles from "./Dashboard.module.css";
import ProjectChart from '../chart/ProjectChart';

const Dashboard = () => { 
  // State to store project data
  const [data, setData] = useState([]);

  // State to store project counts
  const [projectData, setProjectData] = useState({
    totalProjects: 0,
    closedProjects: 0,
    canceledProjects: 0,
    runningProjects: 0,
  });

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch('https://project-manegement.onrender.com/api/allproject')
      .then((response) => response.json())
      .then((data) => {
        // Extract projects data
        const projects = data.projects;

        // Calculate project counts
        const totalProjects = projects.length;
        const closedProjects = projects.filter((project) => project.status === 'Closed').length;
        const canceledProjects = projects.filter((project) => project.status === 'Cancelled').length;
        const runningProjects = totalProjects - closedProjects - canceledProjects;

        // Update state with the fetched data and project counts
        setData(projects);
        setProjectData({
          totalProjects,
          closedProjects,
          canceledProjects,
          runningProjects,
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <div className={styles.dashboard_container}>
      {/* Project Information */}
      <div className={styles.project_info_container}>
        <div className={styles.project_info_item}>
          <div className={styles.info}>
          <p>Total Projects</p>
          <h3>{projectData.totalProjects}</h3>
          </div>
        </div>
        <div className={styles.project_info_item}>
        <div className={styles.info}>
          <p>Closed</p>
          <h3>{projectData.closedProjects}</h3>
          </div>
        </div>
        <div className={styles.project_info_item}>
        <div className={styles.info}>
          <p>Running</p>
          <h3>{projectData.runningProjects}</h3>
          </div>
        </div>
        <div className={styles.project_info_item}>
        <div className={styles.info}>
          <p>Cancelled</p>
          <h3>{projectData.canceledProjects}</h3>
          </div>
        </div>
      </div>

      {/* Project Chart */}
      <div className={styles.chart_container}>
       
        <p>Department wise Total vs Closed</p>
        <ProjectChart data={data} />
      
      
      </div>
    </div>
  );
};

export default Dashboard;

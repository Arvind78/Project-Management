import React, { useEffect, useRef, useState } from 'react';
import styles from "./Dashboard.module.css";
import ProjectChart from '../chart/ProjectChart';
import './CardSlider.css'; // Import your card slider styles

 

const Dashboard = () => {
  // State to store project data
  const [data, setData] = useState([]);

  // State to store project counts
  const [projectData, setProjectData] = useState({
    totalProjects: 0,
    closedProjects: 0,
    canceledProjects: 0,
    runningProjects: 0,
    delayedProjects: 0, // State to store delayed projects count
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
        const delayedProjects = projects.filter((project) => {
          const projectStartDate = new Date(project.startDate);
          const projectEndDate = new Date(project.endDate);
          const today = new Date();
          // Check if project is running, not closed, and today is beyond the end date
          return project.status !== 'Closed' && today > projectEndDate && today > projectStartDate;
        }).length;
        // Update state with the fetched data and project counts
        setData(projects);
        setProjectData({
          totalProjects,
          closedProjects,
          canceledProjects,
          runningProjects,
          delayedProjects  // State to store delayed projects count
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = () => {
    const scrollValue = containerRef.current.scrollLeft;
    setScrollPosition(scrollValue);
  };

  useEffect(() => {
    containerRef.current.scrollLeft = scrollPosition;

  }, [scrollPosition]);

  return (
    <div className={styles.dashboard_container}>
           <div className="slider-container" onScroll={handleScroll} ref={containerRef}>
      <div className="card-wrapper">
   <div  className={styles.card_container}>
    
      <div className={styles.cardInfo}>
        <div className={styles.cardDeteils}>
          <p>Totol Project</p>
          <h2>{projectData.totalProjects}</h2>
        </div>
      </div>

      <div className={styles.cardInfo}>
        <div className={styles.cardDeteils}>
          <p>Closed</p>
          <h2>{projectData.closedProjects}</h2>
        </div>
      </div>

      <div className={styles.cardInfo}>
        <div className={styles.cardDeteils}>
          <p>Running</p>
          <h2>{projectData.runningProjects}</h2>
        </div>
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.cardDeteils}>
          <p>Closer Delay</p>
          <h2>{projectData.delayedProjects}</h2>
        </div>
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.cardDeteils}>
          <p>Cancelled</p>
          <h2>{projectData.canceledProjects}</h2>
        </div>
      </div>
   </div>
      </div>
    </div>
      {/* Project Chart */}

    <div className={styles.chart_container}>
        <ProjectChart data={data} />
      </div>
 
 
    
   
    </div>
  );
};

export default Dashboard;

 
 

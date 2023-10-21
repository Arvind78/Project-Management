import React, { useEffect, useRef, useState } from 'react';
import styles from "./Dashboard.module.css";
import ProjectChart from '../chart/ProjectChart';
import './CardSlider.css'; // Import your card slider styles



const Dashboard = () => {
  // State to store project data
  const [data, setData] = useState([]);
  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch('https://project-manegement.onrender.com/api/project/counter')
      .then((response) => response.json())
      .then((data) => {
        // Extract projects data
        setData(data);

      }).catch((error) => {
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

  }, []);

  return (
    <div className={styles.dashboard_container}>
      <div className="slider-container" onScroll={handleScroll} ref={containerRef}>
        <div className="card-wrapper">
          <div className={styles.card_container}>

            <div className={styles.cardInfo}>
              <div className={styles.cardDeteils}>
                <p>Totol Project</p>
                <h2>{data.totalProjects}</h2>
              </div>
            </div>

            <div className={styles.cardInfo}>
              <div className={styles.cardDeteils}>
                <p>Closed</p>
                <h2>{data.totalClosedProjects}</h2>
              </div>
            </div>

            <div className={styles.cardInfo}>
              <div className={styles.cardDeteils}>
                <p>Running</p>
                <h2>{data.totalRunningProjects}</h2>
              </div>
            </div>
            <div className={styles.cardInfo}>
              <div className={styles.cardDeteils}>
                <p>Closer Delay</p>
                <h2>{data.totalDelayedProjects}</h2>
              </div>
            </div>
            <div className={styles.cardInfo}>
              <div className={styles.cardDeteils}>
                <p>Cancelled</p>
                <h2>{data.totalCancelledProjects}</h2>
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




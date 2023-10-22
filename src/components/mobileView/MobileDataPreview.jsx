// MobileDataPreview.jsx

import React, { useState } from 'react';
import styles from './MobileDataPreview.module.css'; // Import the CSS module
import {FaAngleLeft ,FaAngleRight} from "react-icons/fa6"
import { Button, Pagination } from 'antd';
const MobileDataPreview = ({ data ,handleStatus,loading}) => {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate start and end index for pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
    <div className={styles.parentDiv}>
  
   
      {currentItems.map((item, index) => (
        <div className={styles['box-show']} key={index}>
          <div className={styles.groupdiv}>
          <div>
           <p>Status: <b>{item.status}</b></p>
           </div>
           
           </div>
          <div className={styles.heading}>
            <h3>{item.project}</h3>
            <p>  {`${item.startDate} To ${item.endDate}`}</p>
        
          </div>
        
          <div className={styles.deteilsinfo} >
           <div>
            <p>Reason: {item.reason}</p>
            </div> 
           <div className={styles.deteilGroup}>
            <p>Type: {item.type}</p>
            &nbsp; 
            <li>Category: {item.category}</li>
            </div> 
            <div className={styles.deteilGroup}>
            <p>Div: {item.division}</p>
            &nbsp; 
            <li>Dept: {item.department}</li>
            </div> 
           <div>
           <p> Location: {item.location}</p>
           </div> 
           <div>
           <p>Priority: {item.priority}</p>
           </div>

         
        
          </div>
          <div className={styles.btnGroup}>
        <Button type='primary' onClick={() => handleStatus(item._id, "Running")}>Start</Button>
        <Button onClick={() => handleStatus(item._id, "Closed")}>Close</Button>
        <Button onClick={() => handleStatus(item._id, "Cancelled")}>Cancel</Button>
      </div>
        </div>
      ))}
    
    </div>
    
 
 {loading &&
 <div className={styles.loaderCoantainer}>
        <div className={styles.loader}></div> 
      
       
        </div>  
      }
         {data.length>0 &&
      <div className={styles.pagination}>
         <Pagination
        current={currentPage}
        total={data.length}
        pageSize={itemsPerPage}
        onChange={setCurrentPage}
      />
    </div>
}
    </>
  );
};

export default MobileDataPreview;


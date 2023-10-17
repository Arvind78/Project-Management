import React from 'react';
import styles from "./AddProject.module.css";
import {DatePicker} from "antd"
const AddProject = () => {

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        {/* Project Details */}
        <div className={styles.formGroup}>
          <input type="text" placeholder="Enter Project Theme" className={styles.input} />
          <button type="submit" className={styles.button} >Save Project</button>
        </div>

        {/* Project Information */}
        <div className={styles.formGroup2}>
          <div className={styles.fieldGroup}>
            <label htmlFor="reason">Reason</label>
            <select id="reason" className={styles.select}>
              <option value=""></option>
            
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="type">Type</label>
            <select id="type" className={styles.select}>
              <option value=""></option>
             
            </select>
          </div>

          
          <div className={styles.fieldGroup}>
            <label htmlFor="type">Division</label>
            <select id="type" className={styles.select}>
              <option value=""></option>
               </select>
          </div>

        
        </div>

        <div className={styles.formGroup2}>
          <div className={styles.fieldGroup}>
            <label htmlFor="reason">Category</label>
            <select id="reason" className={styles.select}>
              <option value=""></option>
              
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="type">Priority</label>
            <select id="type" className={styles.select}>
              <option value=""></option>
            
            </select>
          </div>

          
          <div className={styles.fieldGroup}>
            <label htmlFor="type">Department</label>
            <select id="type" className={styles.select}>
              <option value=""></option>
           
            </select>
          </div>

        </div>
        <div className={styles.formGroup2}>
          <div className={styles.fieldGroup}>
            <label htmlFor="reason">Start Date as Project Plan</label>
            <DatePicker placeholder='D Month,Yr' onChange={onChange} />

          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="type">End Date as Project Plan</label>
            <DatePicker placeholder='D Month,Yr' onChange={onChange} />
          </div>

          
          <div className={styles.fieldGroup}>
            <label htmlFor="type">Location</label>
            <select id="type" className={styles.select}>
              <option value=""></option>
              {/* Add options */}
            </select>
          </div>

        </div>

        {/* Project Status */}
        <div className={styles.status}>
          <p>Status: <b>Registered</b></p>
        </div>
      </form>
    </div>
  );
}

export default AddProject;

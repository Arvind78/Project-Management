import React, { useState } from 'react';
import styles from "./AddProject.module.css";
import { DatePicker, notification } from "antd"
import axios from 'axios';

const AddProject = () => {
  const [api, contextHolder] = notification.useNotification();
  const [projectDetails, setProjectDetails] = useState({
    project: '',
    reason: '',
    type: '',
    division: '',
    category: '',
    priority: '',
    department: '',
    startDate: null,
    endDate: null,
    location: '',
  });



  const handleInputChange = (e) => {
    setProjectDetails({
      ...projectDetails,
      [e.target.name]: e.target.value
    });
  };



  const handelNewProject = (e) => {

    e.preventDefault();


    if (projectDetails.project == null || projectDetails.project === "") {
      api.error({
        placement: "top",
        message: "Project name is required",
        description: "Please enter Project name"
      })
      return false;
    }

    if (projectDetails.reason == null || projectDetails.reason === "") {
      api.error({
        placement: "top",
        message: "Reason is required",
        description: "Please enter reason"
      })
      return false;
    }


    if (projectDetails.type == null || projectDetails.type === "") {
      api.error({
        placement: "top",
        message: " Project type is required",
        description: "Please enter project type"
      })
      return false;
    }


    if (projectDetails.division == null || projectDetails.division === "") {
      api.error({
        placement: "top",
        message: "Project division is required",
        description: "Please enter Project division"
      })
      return false;
    }

    if (projectDetails.category == null || projectDetails.category === "") {
      api.error({
        placement: "top",
        message: "Project category is required",
        description: "Please enter Project category"
      })
      return false;
    }

    if (projectDetails.priority == null || projectDetails.priority === "") {
      api.error({
        placement: "top",
        message: "Project priority is required",
        description: "Please enter Project priority"
      })
      return false;
    }

    if (projectDetails.department == null || projectDetails.department === "") {
      api.error({
        placement: "top",
        message: "Project department is required",
        description: "Please enter Project department"
      })
      return false;
    }

    if (projectDetails.startDate == null || projectDetails.startDate === "") {

      api.error({
        placement: "top",
        message: "Project start date is required",
        description: "Please enter Project start date"
      })
      return false;
    }

    if (projectDetails.endDate == null || projectDetails.endDate === "") {
      api.error({
        placement: "top",
        message: "Project end date is required",
        description: "Please enter Project end date"
      })
      return false;
    }


    if (projectDetails.startDate > projectDetails.endDate) {
      api.error({
        placement: "top",
        message: "Project start date less then end date",
        description: "Please enter Project start date  less then end date"
      })
      return false;
    }

    if (projectDetails.location == null || projectDetails.location === "") {
      api.error({
        placement: "top",
        message: "Project location is required",
        description: "Please enter Project location"
      })
      return false
    }

    axios.post("https://project-manegement.onrender.com/api/newproject", projectDetails).then((res) => {

      api.success({
        placement: "top",
        message: "New Add Project Sucess",
        description: res.data.message
      })

    }).catch((err) => {
      api.error({
        placement: "top",
        message: "New Add Project Field",
        description: err.response.data.message
      })
    })
      setProjectDetails({
        project: '',
        reason: '',
        type: '',
        division: '',
        category: '',
        priority: '',
        department: '',
        startDate: '',
        endDate: '',
        location: '',
      });
  }

  return (
    <div className={styles.container}>
      {contextHolder}
      <form className={styles.form}>
        {/* Project Details */}
        <div className={styles.formGroup}>
          <input type="text" placeholder="Enter Project Theme"
            className={styles.input} name="project" value={projectDetails.project} onChange={handleInputChange} />
          <button type="submit" className={styles.button} onClick={handelNewProject} >Save Project</button>
        </div>

        {/* Project Information */}
        <div className={styles.formGroup2}>
          <div className={styles.fieldGroup}>
            <label htmlFor="reason">reason</label>
            <select id="reason" className={styles.select} name="reason" value={projectDetails.reason} onChange={handleInputChange}>
              <option value=""> Reason</option>
              <option value="Business"> For Business</option>
              <option value="Personal">For Personal</option>
              <option value="Dealership">For Dealership</option>
              <option value="Transport">For Transport </option>

            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="type" >Type</label>
            <select id="type" className={styles.select} name="type" value={projectDetails.type} onChange={handleInputChange} >
              <option value="">Type</option>
              <option value="Internal">Internal</option>
              <option value="Vendor">Vendor</option>
              <option value="Online">Online</option>


            </select>
          </div>


          <div className={styles.fieldGroup}>
            <label htmlFor="division">Division</label>
            <select id="division" className={styles.select} name="division" value={projectDetails.division} onChange={handleInputChange}>
              <option value="">Division</option>
              <option value="Filter">Filter</option>
              <option value="Pumps">Pumps</option>
              <option value="Compressor">Compressor</option>
            </select>
          </div>


        </div>

        <div className={styles.formGroup2}>
          <div className={styles.fieldGroup}>
            <label htmlFor="category">Category</label>
            <select id="category" className={styles.select} name="category" value={projectDetails.category} onChange={handleInputChange}>
              <option value="">Category</option>
              <option value="Quality A">Quality A</option>
              <option value="Quality B">Quality B</option>
              <option value="Quality C">Quality C</option>
              <option value="Quality D">Quality D</option>

            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="priority">Priority</label>
            <select id="priority" className={styles.select} name="priority" value={projectDetails.priority} onChange={handleInputChange}>
              <option value="">Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>


            </select>
          </div>


          <div className={styles.fieldGroup}>
            <label htmlFor="department">Department</label>
            <select id="department" className={styles.select} name="department" value={projectDetails.department} onChange={handleInputChange}>
              <option value="">Department</option>
              <option value="HR">HR</option>
              <option value="Strategy">Strategy</option>
              <option value="Finance">Finance</option>
              <option value="Quality">Quality</option>

            </select>
          </div>

        </div>
        <div className={styles.formGroup2}>
          <div className={styles.fieldGroup}>
            <label htmlFor="startDate" >Start Date as Project Plan</label>
            <input type='date' className={styles.select} name="startDate" value={projectDetails.startDate} onChange={handleInputChange} />

          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="endData">End Date as Project Plan</label>
            <input type='date' className={styles.select} name="endDate" value={projectDetails.endDate} onChange={handleInputChange} />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="location">Location</label>
            <select id="location" className={styles.select} name="location" value={projectDetails.location} onChange={handleInputChange}>
              <option value="">Location</option>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Gujrat">Gujrat</option>
              <option value="Delhi">Delhi</option>
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

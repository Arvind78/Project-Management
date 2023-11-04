import React, { useEffect, useMemo, useState } from 'react';
import styles from "./ShowProject.module.css";
import { Button, Table } from 'antd';
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import MobileDataPreview from '../mobileView/MobileDataPreview';

const ShowProject = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [windowWidth, setWindowWidth] = useState("")
  const [selectedSortOption, setSelectedSortOption] = useState(''); // State to track selected sorting option
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    setInterval(() => {
      setWindowWidth(window.innerWidth)
    }, 0);
    getData();
  }, [windowWidth]);

  // Fetch project data from the API
  const getData = () => {
    setLoading(true)
    axios.get("https://project-manegement.onrender.com/api/allproject")
      .then((res) => {
        setData(res.data.projects);
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        throw err;
      });
  };

  // Handle project status change (Running, Closed, Cancelled)
  const handleStatus = (id, status) => {

    axios.put("https://project-manegement.onrender.com/api/update", { id, status })
      .then(() => {
        getData();
      })
      .catch((err) => {
        throw err;
      });
  };

  // Handle search functionality using useMemo to perform filtering
  const filteredData = useMemo(() => {
    if (!searchValue) {
      // If search input is empty, return all data
      return data;
    } else {
      // Perform case-insensitive search
      const searchLowerCase = searchValue.toLowerCase();
      const searchData = data.filter(item => {
        // Filter based on relevant fields; adjust as per your data structure
        return (
          item.project.toLowerCase().includes(searchLowerCase) ||
          item.reason.toLowerCase().includes(searchLowerCase) ||
          item.division.toLowerCase().includes(searchLowerCase) ||
          item.category.toLowerCase().includes(searchLowerCase) ||
          item.priority.toLowerCase().includes(searchLowerCase) ||
          item.department.toLowerCase().includes(searchLowerCase) ||
          item.location.toLowerCase().includes(searchLowerCase) ||
          item.status.toLowerCase().includes(searchLowerCase)
        );
      });
      return setData(searchData)
    }
  }, [searchValue]);

  // Handle sort functionality

  const handleSort = async (sortField) => {

    try {
      const response = await fetch(`https://project-manegement.onrender.com/api/sort?q=${sortField}`);
      if (response.ok) {
        const data = await response.json();
        setData(data.projects);
      } else {
        console.error('Error fetching data');
      }
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    handleSort(selectedSortOption);
  }, [selectedSortOption]); // Re-run effect whenever selectedSortOption changes

  // Data mapping for table display
  const dataSource = data.map((item, index) => ({
    key: index,
    ProjectName: (
      <div >
        <p style={{textTransform: "capitalize"}}>{item.project}</p>
        {`${item.startDate} to ${item.endDate}`}

      </div>
    ),
    Reason: item.reason,
    Division: item.division,
    Category: item.category,
    Priority: item.priority,
    Department: item.department,
    Location: item.location,
    Status: item.status,
    Pro_leader: item.projectLeader,
    update: (
      <div className={styles.btnGroup}>
        <Button style={{borderRadius:"30px"}} type={"primary"} onClick={() => handleStatus(item._id, "Running")}>Start</Button>
        <Button style={{borderRadius:"30px"}} type={"default"} onClick={() => handleStatus(item._id, "Closed")}>Close</Button>
        <Button  style={{borderRadius:"30px"}} type={"default"} onClick={() => handleStatus(item._id, "Cancelled")}>Cancel</Button>
      </div>
    ),
  }));

  // Table columns definition
  const columns = [
    {
      title: 'Project',
      dataIndex: 'ProjectName',
      key: 'ProjectName',
    },
    {
      title: 'Reason',
      dataIndex: 'Reason',
      key: 'Reason',
    },
    {
      title: 'Division',
      dataIndex: 'Division',
      key: 'Division',
    },
    {
      title: 'Category',
      dataIndex: 'Category',
      key: 'Category',
    },
    {
      title: 'Priority',
      dataIndex: 'Priority',
      key: 'Priority',
    },
    {
      title: 'Dept.',
      dataIndex: 'Department',
      key: 'Department',
    },
    {
      title: 'Location',
      dataIndex: 'Location',
      key: 'Location',
    },

    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
    },
    
    {
      title: 'Pro_Leader',
      dataIndex: 'Pro_leader',
      key: 'Pro_leader',
    },

    {
      title: '',
      dataIndex: 'update',
      key: 'update',
    },



  ];

  return (
    < div className={styles.showDataContainer}>
      <div className={styles.searchBar}>
        <div className={styles.sortOption}>
          <input
            type='search'
            className={styles.sortOptionInput}
            placeholder="Search..."
            onChange={(e) => {
              setSearchValue(e.target.value);
              if (e.target.value === "") return getData();
            }}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="sortOptions">Sort By: </label>
          <select
            id="sortOptions"
            style={{ borderRadius: "3px", padding: '5px' }}
            className={styles.sortSelect}
            value={selectedSortOption}
            onChange={(e) => setSelectedSortOption(e.target.value)}
          >
            <option value="priority">Priority</option>
            <option value="category">Category</option>
            <option value="reason">Reason</option>
            <option value="division">Division</option>
            <option value="department">Department</option>
            <option value="location">Location</option>
          </select>
        </div>
      </div>

      {(windowWidth > 810) ?
        <div className={styles.tableContainer}>
          {/* Table component */}
          <Table dataSource={dataSource}
            style={{padding:"0px 10px"}}
            pagination={{ pageSize: 5 }}
            loading={loading} columns={columns} />
        </div>
        :

        <MobileDataPreview data={data} loading={loading}  handleStatus={handleStatus} />

      }
    </div>
  );
};

export default ShowProject;


import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ProjectChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://project-manegement.onrender.com/api/success/data')
      .then(response => response.json())
      .then(data => {
        // Process the API response and prepare data for the chart
        const departments = Object.keys(data.departmentSuccessPercentage);
        const chartData = departments.map(department => {
          const { total, closed, successPercentage } = data.departmentSuccessPercentage[department];
          return {
            name: department,
            total,
            closed,
            successPercentage,
          };
        });
        setChartData(chartData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const options = {
    chart: {
      type: 'column',
      backgroundColor: '#fff', // Set chart background color
      height:'300px', 
      borderRadius:"8px",
      padding:"55px",
      minWidth:"900px"// Set chart height
    },
    title: {
      text: null, // Remove chart title
    },
    xAxis: {
      categories: chartData ? chartData.map(item => [item.successPercentage, item.name]) : [],
      crosshair: true,
      labels: {
        formatter: function () {
          return (this.value[0]).replace(".00","") + '<br/>' + this.value[1];
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Projects',
      },
      gridLineColor: "transparent", // Set yAxis grid line color
      lineColor: '#ccc', // Set yAxis line color
      labels: {
        format: '{value}', // Format for y-axis labels
      },
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        borderRadius: 5, // Add border radius to columns
        dataLabels: {
          enabled: true,
          format: '{point.y}', // Display data labels on top of columns
        },
        states: {
          hover: {
            enabled: false, // Disable hover effect on columns
          },
        },
      },
    },
    series: [{
      name: 'Total',
      data: chartData ? chartData.map(item => item.total) : [],
      color: '#044e92', // Set total column color
    }, {
      name: 'Closed',
      data: chartData ? chartData.map(item => item.closed) : [],
      color: 'green', // Set closed column color
    }],
    legend: {
      enabled: true, // Remove legend
    },
    credits: {
      enabled: false, // Remove Highcharts credits
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: 1600, // Adjust based on your design needs
        },
        chartOptions: {
          xAxis: {
            labels: {
              rotation: 0, // Rotate x-axis labels if needed for better visibility
            },
          },
        },
      }, {
        condition: {
          maxWidth: 240, // Adjust based on your design needs
        },
        chartOptions: {
          xAxis: {
            labels: {
              rotation: -45, // Rotate x-axis labels for better visibility on smaller screens
            },
          },
        },
      }],
    },
  };

  return (
    <div>
      {chartData && <HighchartsReact highcharts={Highcharts} options={options} />}
    </div>
  );
};

export default ProjectChart;

import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ProjectChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://project-manegement.onrender.com/api/chart/data')
      .then(response => response.json())
      .then(data => {
        // Process the API response and prepare data for the chart
        setChartData(data.departmentSuccessPercentage);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  console.log(chartData);

  const options = {
    chart: {
      type: 'column',
      backgroundColor: '#fff', // Set chart background color
      height:'400px', 
      borderRadius:"8px",
    
    },
    title: {

      text: "Department wise Total vs Closed",
      style: {
        fontSize: '21px', // Set the font size of the title
          textAlign: 'left', // Align the title text ('left', 'center', or 'right')
        color:"#96a1a9"
      }
       // Remove chart title

       
    },
    xAxis: {
      categories: chartData ? chartData.map(item => [item.successPercentage, item.department]) : [],
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
          maxWidth: 390, // Adjust based on your design needs
        },
        chartOptions: {
          title: {
            style: {
                fontSize: '16px' // Adjust font size for smaller screens
            }
        },
          xAxis: {
            labels: {
              rotation: -0, // Rotate x-axis labels for better visibility on smaller screens
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

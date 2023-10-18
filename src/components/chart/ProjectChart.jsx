import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Label,
  Legend,
  ResponsiveContainer
} from 'recharts';

const ProjectChart = ({ data }) => {
  // Extract unique department names from the data
  const uniqueDepartments = [...new Set(data.map(item => item.department))];

  // Prepare data for the bar chart by calculating total and closed projects for each department
  const chartData = uniqueDepartments.map(department => {
    const total = data.filter(item => item.department === department).length;
    const closed = data.filter(
      item => item.department === department && item.status === 'Closed'
    ).length;
    return { department, total, closed };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      {/* Bar Chart displaying project counts based on departments */}
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        {/* X-Axis representing department names */}
        <XAxis dataKey="department" />
        {/* Y-Axis for project counts */}
        <YAxis />
        {/* Tooltip to display detailed information on hover */}
        {/* Label for the X-Axis */}
        <Label value="Department" offset={0} position="insideBottom" />
        {/* Legend indicating color representation for 'total' and 'closed' bars */}
        <Legend iconType="circle" />
        {/* Bar representing total projects with label above the bar */}
        <Bar dataKey="total" fill="#8884d8" barSize={15}>
          {/* Data label for total projects above the bar */}
          <Label dataKey="total" position="top" />
        </Bar>
        {/* Bar representing closed projects with label above the bar */}
        <Bar dataKey="closed" fill="#82ca9d" barSize={15}>
          {/* Data label for closed projects above the bar */}
          <Label dataKey="closed" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProjectChart;

// src/components/LineGraph.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LineGraph = ({ data }) => {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="work_year" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="salary_in_usd" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  );
};

export default LineGraph;

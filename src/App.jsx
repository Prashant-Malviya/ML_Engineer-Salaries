// src/App.jsx
import React, { useEffect, useState } from 'react';
import 'antd/dist/reset.css';
import './App.css';
import { Table } from 'antd';
import axios from 'axios';
import SalaryTable from './components/SalaryTable';
import LineGraph from './components/LineGraph';

const { Column } = Table;

const App = () => {
  const [data, setData] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/salaries')
      .then(response => {
        const formattedData = response.data.map(item => ({
          work_year: Number(item.work_year),
          salary_in_usd: Number(item.salary_in_usd),
          job_title: item.job_title,
        }));
        setData(formattedData);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleRowClick = (record) => {
    setSelectedYear(record.work_year);
    axios.get(`http://localhost:5000/api/jobs/${record.work_year}`)
      .then(response => {
        setJobDetails(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the job details!', error);
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>ML Engineer Salaries</h1>
      <SalaryTable data={data} onRowClick={handleRowClick} />
      <h2>Job Trends</h2>
      <LineGraph data={data} />
      {selectedYear && (
        <>
          <h2>Job Details for {selectedYear}</h2>
          <Table dataSource={jobDetails} rowKey="job_title">
            <Column title="Job Title" dataIndex="job_title" key="job_title" />
            <Column title="Count" dataIndex="count" key="count" />
          </Table>
        </>
      )}
    </div>
  );
};

export default App;

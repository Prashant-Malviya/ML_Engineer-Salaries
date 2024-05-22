import React, { useEffect, useState } from 'react';
import 'antd/dist/reset.css';
import './App.css';
import axios from 'axios';
import SalaryTable from './components/SalaryTable';
import LineGraph from './components/LineGraph';
import { Table } from 'antd';

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
    const filteredData = data.filter(item => item.work_year === record.work_year);

    const jobCounts = filteredData.reduce((acc, item) => {
      acc[item.job_title] = (acc[item.job_title] || 0) + 1;
      return acc;
    }, {});

    const aggregatedData = Object.entries(jobCounts).map(([title, count]) => ({
      job_title: title,
      count,
    }));

    setJobDetails(aggregatedData);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">ML Engineer Salaries</h1>
      <SalaryTable data={data} onRowClick={handleRowClick} />
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-center">Job Trends</h2>
      <LineGraph data={data} />
      {selectedYear && (
        <>
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-center">Job Details for {selectedYear}</h2>
          <Table dataSource={jobDetails} rowKey="job_title" className="shadow-md rounded-lg overflow-hidden">
            <Table.Column title="Job Title" dataIndex="job_title" key="job_title" />
            <Table.Column title="Total Jobs" dataIndex="count" key="count" />
          </Table>
        </>
      )}
    </div>
  );
};

export default App;

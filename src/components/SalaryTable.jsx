import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';

const SalaryTable = ({ onRowClick }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/salaries')
      .then(response => {
        console.log('API response:', response.data); // Log the response data

        // Ensure the data is in the correct format
        const formattedData = response.data.map((item, index) => ({
          key: `${item.work_year}-${index}`, // Generate a unique key
          work_year: Number(item.work_year),
          job_title: item.job_title,
          salary_in_usd: Number(item.salary_in_usd),
        }));

        setData(formattedData);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  useEffect(() => {
    console.log('Data state updated:', data); // Log the updated data state
  }, [data]);

  const columns = [
    {
      title: 'Year',
      dataIndex: 'work_year',
      key: 'work_year',
      sorter: (a, b) => a.work_year - b.work_year,
    },
    {
      title: 'Job Title',
      dataIndex: 'job_title',
      key: 'job_title',
      sorter: (a, b) => a.job_title.localeCompare(b.job_title),
    },
    {
      title: 'Salary in USD',
      dataIndex: 'salary_in_usd',
      key: 'salary_in_usd',
      sorter: (a, b) => a.salary_in_usd - b.salary_in_usd,
    },
  ];

  console.log('Table data:', data); // Log data before rendering

  return (
    <Table
      columns={columns}
      dataSource={data}
      onRow={(record) => ({
        onClick: () => onRowClick(record),
      })}
      pagination={{ pageSize: 10 }} // Keep pagination enabled
    />
  );
};

export default SalaryTable;

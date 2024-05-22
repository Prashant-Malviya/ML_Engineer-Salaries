import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import classNames from 'classnames'; // Import classNames for conditional class application

const SalaryTable = ({ onRowClick }) => {
  const [data, setData] = useState([]);
  const [selectedRowKey, setSelectedRowKey] = useState(null); // State to track the selected row

  useEffect(() => {
    axios.get('http://localhost:5000/api/salaries')
      .then(response => {
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

  const handleRowClick = (record) => {
    setSelectedRowKey(record.key); // Set the selected row key
    onRowClick(record); // Call the onRowClick handler passed as prop
  };

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

  return (
    <Table
      columns={columns}
      dataSource={data}
      onRow={(record) => ({
        onClick: () => handleRowClick(record),
        className: classNames('cursor-pointer', { 'bg-gray-100': record.key === selectedRowKey }), 
      })}
      pagination={{ pageSize: 10 }}
      className="shadow-md rounded-lg overflow-hidden"
    />
  );
};

export default SalaryTable;

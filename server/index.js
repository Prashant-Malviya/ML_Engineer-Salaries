const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const cors = require('cors'); // Import cors
const app = express();
const port = 5000;

app.use(cors()); // Enable CORS

let salaries = [];

fs.createReadStream('salaries.csv')
  .pipe(csv())
  .on('data', (data) => salaries.push(data))
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

app.get('/api/salaries', (req, res) => {
  res.json(salaries);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

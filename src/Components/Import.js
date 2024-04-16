import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

const FileImporter = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Generate a unique report_id for this import
      const report_id = uuidv4();

      // Read the contents of the CSV file
      const fileReader = new FileReader();
      fileReader.onload = async (event) => {
        const csvData = event.target.result;

        // Split the CSV data into rows
        const rows = csvData.split('\n');

        // Extract headers from the first row
        const headers = rows[0].split(',');

        // Process each row (starting from index 1, skipping the header row)
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i].split(',');

          // Construct rowData object dynamically based on headers
          const rowData = {};
          rowData.report_id = report_id; // Use the same report_id for all rows
          rowData.entry_id = `${report_id}_${i}_${uuidv4()}`; // Unique entry_id using UUID
          for (let j = 0; j < headers.length; j++) {
            // Convert values to appropriate types based on headers
            const value = row[j].trim(); // Trim whitespace
            let key = headers[j].toLowerCase(); // Convert header to lowercase
            if (headers[j] === 'Amount' || headers[j] === 'Balance') {
              rowData[key] = parseFloat(value);
            } else if (headers[j] === 'Posting Date') {
              key = 'post_date'; // Change the key to 'post_date'
              const [month, day, year] = value.split('/');
              rowData[key] = `${year}-${month}-${day}`;
            } else {
              rowData[key] = value.toLowerCase();
            }
          }

          console.log("rowData", rowData);

          try {
            // Send the data to your server endpoint for insertion into the database
            await axios.post('http://localhost:3001/client-reports', rowData);
            console.log('Row data sent:', rowData);
          } catch (error) {
            console.error('Error sending row data:', error);
          }
        }

        console.log('CSV data sent to the server for processing.');
      };
      fileReader.readAsText(selectedFile);
    } catch (error) {
      console.error('Error processing CSV file:', error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>
    </div>
  );
};

export default FileImporter;

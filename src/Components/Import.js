import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator
import md5 from 'md5';
const FileImporter = (formData,clientID) => {
  const [selectedFile, setSelectedFile] = useState(null);
// Helper function to generate a random 5-digit number
  // Helper function to generate a 5-digit unique ID from uuidv4
  const generateUniqueId = () => {
    const uuid = uuidv4();
    const hash = md5(uuid);
    const uniqueId = parseInt(hash.substring(0, 5), 16) % 100000; // Convert to a 5-digit number
    return uniqueId.toString().padStart(5, '0'); // Ensure it's always 5 digits
  };

  const handleFileUpload = async () => {
    try {
       
      // Generate a unique report_id for this import
      const report_id = generateUniqueId();

      // Read the contents of the CSV file
      const fileReader = new FileReader();
      fileReader.onload = async (event) => {
        const csvData = event.target.result;

        // Split the CSV data into rows
        const rows = csvData.split('\n');

        // Extract headers from the first row
        const headers = rows[0].split(',');
      
        // Process each row (starting from index 1, skipping the header row)
   // Process each row (starting from index 1, skipping the header row)
for (let i = 1; i < rows.length; i++) {
  const row = rows[i].split(',');

  // Construct rowData object dynamically based on headers
  const rowData = {};
  rowData.report_id = report_id; // Use the same report_id for all rows
  rowData.entry_id = `${report_id}-${i}`; // Unique entry_id using UUID
  rowData.client_id = formData.clientId; // Add clientID to rowData
  for (let j = 0; j < headers.length; j++) {
    // Ensure row[j] is defined before processing
    if (row[j] !== undefined) {
      // Convert values to appropriate types based on headers
      const value = row[j].trim(); // Trim whitespace
      let key = headers[j].toLowerCase(); // Convert header to lowercase
      if (headers[j] === 'Amount' || headers[j] === 'Balance') {
        rowData[key] = parseFloat(value);
      } else if (headers[j] === 'Posting Date') {
        key = 'post_date'; // Change the key to 'post_date'
        const [month, day, year] = value.split('/');
        rowData[key] = `${year}-${month}-${day}`;
      } else if (headers[j] === 'Description') {
        // Remove surrounding double quotes if present
        rowData[key] = value.replace(/^"(.*)"$/, '$1').trim().replace(/\s+/g, ' ');

      } else {
        rowData[key] = value.toLowerCase();
      }
    } else {
      console.warn(`Warning: row[${j}] is undefined, skipping.`);
    }
  }



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

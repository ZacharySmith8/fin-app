const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Your routes and other middleware


app.use(bodyParser.json());

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password',
  database: 'finreports'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


// Get all clients
app.get('/clients', (req, res) => {
  connection.query('SELECT * FROM clients', (error, results) => {
    if (error) {
      console.error('Error retrieving clients:', error); // Log the error message
      res.status(500).json({ error: 'Error retrieving clients', message: error.message }); // Send the error message back as part of the response
      return; // Return to prevent further execution
    }
    res.json(results);
  });
});
  
  // Get client by ID
  app.get('/clients/:id', (req, res) => {
    const clientId = req.params.id;
    connection.query('SELECT * FROM clients WHERE client_id = ?', [clientId], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error retrieving client' });
        throw error;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Client not found' });
      } else {
        res.json(results[0]);
      }
    });
  });
  
// Create a new client
app.post('/clients', (req, res) => {
  const { first_name, last_name, email, report_id } = req.body;
  connection.query('INSERT INTO client (first_name, last_name, email, report_id) VALUES (?, ?, ?, ?)', [first_name, last_name, email, report_id], (error, result) => {
    if (error) {
      // Log the error for debugging
      console.error('Error creating client:', error);
      // Send the error response and return to prevent further execution
      return res.status(500).json({ error: 'Error creating client' });
    }
    // Send the success response
    res.status(201).json({ message: 'Client created successfully', id: result.insertId });
  });
});

  
  // Update client by ID
  app.put('/clients/:id', (req, res) => {
    const clientId = req.params.id;
    const { client_name, client_report } = req.body;
    connection.query('UPDATE clients SET client_name = ?, client_report = ? WHERE client_id = ?', [client_name, client_report, clientId], (error, result) => {
      if (error) {
        res.status(500).json({ error: 'Error updating client' });
        throw error;
      }
      res.json({ message: 'Client updated successfully' });
    });
  });
  
  // Delete client by ID
  app.delete('/clients/:id', (req, res) => {
    const clientId = req.params.id;
    connection.query('DELETE FROM clients WHERE client_id = ?', [clientId], (error, result) => {
      if (error) {
        res.status(500).json({ error: 'Error deleting client' });
        throw error;
      }
      res.json({ message: 'Client deleted successfully' });
    });
  });
  
  
// Get all client reports
app.get('/client-reports', (req, res) => {
    connection.query('SELECT post_date,description,amount,balance,details,category_id FROM client_reports', (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error retrieving client reports' });
        throw error;
      }
      res.json(results);
    });
  });
  
  // Get client report by ID
  app.get('/client-reports/:id', (req, res) => {
    const reportId = req.params.id;
    connection.query('SELECT * FROM client_reports WHERE report_id = ?', [reportId], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error retrieving client report' });
        throw error;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Client report not found' });
      } else {
        res.json(results[0]);
      }
    });
  });

// Create a new client report
app.post('/client-reports', (req, res) => {
  const { report_id, post_date, description, amount, balance, category_id,entry_id,details,client_id } = req.body;
  connection.query(
    'INSERT INTO client_reports (report_id, post_date, description, amount, balance, category_id,entry_id, details,client_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)',
    [report_id, post_date, description, amount, balance, category_id,entry_id,details,client_id],
    (error, result) => {
      if (error) {
        // Send detailed error message
        console.error('Error creating client report:', error);
        res.status(500).json({ error: 'Error creating client report', detailed_error: error.message });
        return; // Terminate function execution to prevent further execution
      }
      res.status(201).json({ message: 'Client report created successfully', id: result.insertId });
    }
  );
});

  
  // Update client report by ID
  app.put('/client-reports/:id', (req, res) => {
    const reportId = req.params.id;
    const { post_date, description, amount, balance, category_id } = req.body;
    connection.query('UPDATE client_reports SET post_date = ?, description = ?, amount = ?, balance = ?, category_id = ? WHERE report_id = ?', 
      [post_date, description, amount, balance, category_id, reportId], 
      (error, result) => {
        if (error) {
          res.status(500).json({ error: 'Error updating client report' });
          throw error;
        }
        res.json({ message: 'Client report updated successfully' });
      }
    );
  });
  
  // Delete client report by ID
  app.delete('/client-reports/:id', (req, res) => {
    const reportId = req.params.id;
    connection.query('DELETE FROM client_reports WHERE report_id = ?', [reportId], (error, result) => {
      if (error) {
        res.status(500).json({ error: 'Error deleting client report' });
        throw error;
      }
      res.json({ message: 'Client report deleted successfully' });
    });
  });
  
  // Create a new grocery store
app.post('/grocery-stores', (req, res) => {
  const { store_name, store_logo } = req.body;
  connection.query('INSERT INTO stores (store_name, store_logo) VALUES (?, ?)', [store_name, store_logo], (error, result) => {
    if (error) {
      res.status(500).json({ error: 'Error creating grocery store', detailed_error: error.message });
      return;
    }
    res.status(201).json({ message: 'Grocery store created successfully', id: result.insertId });
  });
});

// Read all grocery stores
app.get('/grocery-stores', (req, res) => {
  connection.query('SELECT * FROM stores WHERE type = "groceries"', (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error retrieving grocery stores', detailed_error: error.message });
      return;
    }
    res.json(results);
  });
});

// Read a grocery store by ID
app.get('/grocery-stores/:id', (req, res) => {
  const storeId = req.params.id;
  connection.query('SELECT * FROM stores WHERE id = ?', [storeId], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error retrieving grocery store', detailed_error: error.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Grocery store not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Update a grocery store by ID
app.put('/grocery-stores/:id', (req, res) => {
  const storeId = req.params.id;
  const { store_name, store_logo } = req.body;
  connection.query('UPDATE stores SET store_name = ?, store_logo = ? WHERE id = ?', [store_name, store_logo, storeId], (error, result) => {
    if (error) {
      res.status(500).json({ error: 'Error updating grocery store', detailed_error: error.message });
      return;
    }
    res.json({ message: 'Grocery store updated successfully' });
  });
});

// Delete a grocery store by ID
app.delete('/grocery-stores/:id', (req, res) => {
  const storeId = req.params.id;
  connection.query('DELETE FROM stores WHERE id = ?', [storeId], (error, result) => {
    if (error) {
      res.status(500).json({ error: 'Error deleting grocery store', detailed_error: error.message });
      return;
    }
    res.json({ message: 'Grocery store deleted successfully' });
  });
});

// Create a new gas station
app.post('/gas', (req, res) => {
  const { store_name, store_logoo } = req.body;
  connection.query('INSERT INTO stores (store_name, store_logoo) VALUES (?, ?)', [store_name, store_logoo], (error, result) => {
    if (error) {
      res.status(500).json({ error: 'Error creating gas station', detailed_error: error.message });
      return;
    }
    res.status(201).json({ message: 'Gas station created successfully', id: result.insertId });
  });
});

// Read all gas stations
app.get('/gas', (req, res) => {
  connection.query('SELECT * FROM stores WHERE type = "gas"', (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error retrieving gas stations', detailed_error: error.message });
      return;
    }
    res.json(results);
  });
});

// Read a gas station by ID
app.get('/gas/:id', (req, res) => {
  const stationId = req.params.id;
  connection.query('SELECT * FROM stores WHERE id = ?', [stationId], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error retrieving gas station', detailed_error: error.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Gas station not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Update a gas station by ID
app.put('/gas/:id', (req, res) => {
  const stationId = req.params.id;
  const { store_name, store_logoo } = req.body;
  connection.query('UPDATE stores SET store_name = ?, store_logoo = ? WHERE id = ?', [store_name, store_logoo, stationId], (error, result) => {
    if (error) {
      res.status(500).json({ error: 'Error updating gas station', detailed_error: error.message });
      return;
    }
    res.json({ message: 'Gas station updated successfully' });
  });
});

// Delete a gas station by ID
app.delete('/gas/:id', (req, res) => {
  const stationId = req.params.id;
  connection.query('DELETE FROM stores WHERE id = ?', [stationId], (error, result) => {
    if (error) {
      res.status(500).json({ error: 'Error deleting gas station', detailed_error: error.message });
      return;
    }
    res.json({ message: 'Gas station deleted successfully' });
  });
});

// Define your API endpoints here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
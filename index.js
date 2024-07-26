// Import required modules
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql');

// Load environment variables from .env file
dotenv.config();

// Create a MySQL connection
const dbconnect = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

// Connect to the MySQL database
dbconnect.connect((err) => {
    if (err) {
        console.error('Connection failed:', err.stack);
        return;
    } console.log('Connected');
});



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Get request for the data in device table
app.get('/get', (req, res) => {
    let query = 'SELECT * FROM device';

    dbconnect.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

// Get request for all data in all tables
app.get('/getall', (req, res) => {
    const query = 'SELECT * FROM device JOIN device_info ON device.DeviceID = device_info.DeviceID JOIN device_specs ON device.DeviceID = device_specs.DeviceID';

    dbconnect.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});


app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
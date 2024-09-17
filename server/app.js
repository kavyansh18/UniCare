const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// PostgreSQL Pool Setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

app.get('/', (req, res) => {
  res.send('Blood Donation Registration API');
});

// Register a New Donor
app.post('/donor/register', async (req, res) => {
  const { name, mobile, age, blood_group, availability, email } = req.body;

  if (!name || !mobile || !age || !blood_group || !availability || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (
    typeof name !== 'string' ||
    typeof mobile !== 'string' ||
    typeof age !== 'number' ||
    typeof blood_group !== 'string' ||
    typeof availability !== 'string' ||
    typeof email !== 'string'
  ) {
    return res.status(400).json({ error: 'Invalid data types' });
  }

  const validAvailability = ['high', 'low'];
  if (!validAvailability.includes(availability.toLowerCase())) {
    return res.status(400).json({ error: "Availability must be either 'high' or 'low'" });
  }

  const validBloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  if (!validBloodGroups.includes(blood_group.toUpperCase())) {
    return res.status(400).json({ error: 'Invalid blood group' });
  }

  try {
    const query = `
      INSERT INTO donors (name, mobile, age, blood_group, availability, mailID)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`;
    const values = [name, mobile, age, blood_group.toUpperCase(), availability.toLowerCase(), email];
    const result = await pool.query(query, values);

    res.status(201).json({
      message: 'Donor registered successfully',
      donor: result.rows[0],
    });
  } catch (err) {
    console.error('Error inserting donor:', err);

    if (err.code === '23505') {
      if (err.detail.includes('mobile')) {
        return res.status(409).json({ error: 'Mobile number already registered' });
      }
      if (err.detail.includes('mailID')) {
        return res.status(409).json({ error: 'Email already registered' });
      }
    }

    res.status(500).json({ error: 'Database error' });
  }
});



// Get All Donors
app.get('/donors', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM donors ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching donors:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/donor', async (req, res) => {
  const { email } = req.query; 

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const query = `SELECT * FROM donors WHERE mailID = $1`;
    const values = [email];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Donor not found' });
    }

    res.json(result.rows[0]); 
  } catch (err) {
    console.error('Error fetching donor by email:', err);
    res.status(500).json({ error: 'Database error' });
  }
});


// Update Donor by Email
app.put('/donor/update', async (req, res) => {
  const { name, mobile, age, blood_group, availability, email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const query = `
      UPDATE donors
      SET name = $1, mobile = $2, age = $3, blood_group = $4, availability = $5
      WHERE mailID = $6
      RETURNING *`;
    const values = [name, mobile, age, blood_group.toUpperCase(), availability.toLowerCase(), email];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Donor not found' });
    }

    res.json({
      message: 'Donor information updated successfully',
      donor: result.rows[0],
    });
  } catch (err) {
    console.error('Error updating donor by email:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.delete('/donor', async (req, res) => {
  const { email } = req.query; 

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const query = `DELETE FROM donors WHERE mailID = $1 RETURNING *`;
    const values = [email];
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Donor not found' });
    }

    res.json({
      message: 'Donor deleted successfully',
    });
  } catch (err) {
    console.error('Error deleting donor by email:', err);
    res.status(500).json({ error: 'Database error' });
  }
});


// Start the Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

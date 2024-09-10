const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:5174', // Update with the correct frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

// Middleware
app.use(cors(corsOptions)); // Use CORS with options
app.use(bodyParser.json());

// PostgreSQL Pool Setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// Health Check Endpoint
app.get('/', (req, res) => {
  res.send('Blood Donation Registration API');
});

// Register a New Donor
app.post('/donor/register', async (req, res) => {
  const { name, mobile, age, blood_group, availability } = req.body;

  if (!name || !mobile || !age || !blood_group || !availability) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (
    typeof name !== 'string' ||
    typeof mobile !== 'string' ||
    typeof age !== 'number' ||
    typeof blood_group !== 'string' ||
    typeof availability !== 'string'
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
      INSERT INTO donors (name, mobile, age, blood_group, availability)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`;
    const values = [name, mobile, age, blood_group.toUpperCase(), availability.toLowerCase()];
    const result = await pool.query(query, values);

    res.status(201).json({
      message: 'Donor registered successfully',
      donor: result.rows[0],
    });
  } catch (err) {
    console.error('Error inserting donor:', err);

    if (err.code === '23505') {
      return res.status(409).json({ error: 'Mobile number already registered' });
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

// Get Donor by ID
app.get('/donor/:id', async (req, res) => {
  const { id } = req.params;

  if (isNaN(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid donor ID' });
  }

  try {
    const result = await pool.query('SELECT * FROM donors WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Donor not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching donor:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update Donor Availability by ID
app.put('/donor/:id/availability', async (req, res) => {
  const { id } = req.params;
  const { availability } = req.body;

  if (isNaN(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid donor ID' });
  }

  const validAvailability = ['high', 'low'];
  if (!availability || !validAvailability.includes(availability.toLowerCase())) {
    return res.status(400).json({ error: "Availability must be either 'high' or 'low'" });
  }

  try {
    const query = `
      UPDATE donors
      SET availability = $1
      WHERE id = $2
      RETURNING *`;
    const values = [availability.toLowerCase(), id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Donor not found' });
    }

    res.json({
      message: 'Availability updated successfully',
      donor: result.rows[0],
    });
  } catch (err) {
    console.error('Error updating availability:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Delete Donor by ID
app.delete('/donor/:id', async (req, res) => {
  const { id } = req.params;

  if (isNaN(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid donor ID' });
  }

  try {
    const result = await pool.query('DELETE FROM donors WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Donor not found' });
    }

    res.json({
      message: 'Donor deleted successfully',
      donor: result.rows[0],
    });
  } catch (err) {
    console.error('Error deleting donor:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Start the Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

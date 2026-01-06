const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Wishours Billing API Running');
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Init Database Tables
app.get('/api/init', async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(255) PRIMARY KEY,
        date TIMESTAMP NOT NULL,
        total NUMERIC NOT NULL,
        subtotal NUMERIC NOT NULL,
        tax NUMERIC NOT NULL,
        status VARCHAR(50) DEFAULT 'completed',
        payment_method VARCHAR(50),
        synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id VARCHAR(255) REFERENCES orders(id),
        product_name VARCHAR(255) NOT NULL,
        quantity INTEGER NOT NULL,
        unit_price NUMERIC NOT NULL,
        total_price NUMERIC NOT NULL
      );
    `);
    res.json({ message: 'Tables created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Sync Orders Endpoint
app.post('/api/sync', async (req, res) => {
  const { orders } = req.body;
  if (!orders || !Array.isArray(orders)) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    let savedCount = 0;
    for (const order of orders) {
      // Check if exists
      const check = await client.query('SELECT id FROM orders WHERE id = $1', [order.id]);
      if (check.rows.length > 0) continue;

      // Insert Order
      await client.query(
        'INSERT INTO orders (id, date, total, subtotal, tax, status, payment_method) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [order.id, order.date, order.totals.total, order.totals.subtotal, order.totals.tax, order.status, order.payment?.tendered ? 'cash' : 'other']
      );

      // Insert Items
      for (const item of order.items) {
        await client.query(
          'INSERT INTO order_items (order_id, product_name, quantity, unit_price, total_price) VALUES ($1, $2, $3, $4, $5)',
          [order.id, item.name, item.qty, item.unitPrice, item.qty * item.unitPrice]
        );
      }
      savedCount++;
    }

    await client.query('COMMIT');
    res.json({ message: 'Sync successful', saved: savedCount });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

// Get Sales Report
app.get('/api/sales/daily', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const result = await pool.query('SELECT SUM(total) as total, COUNT(*) as count FROM orders WHERE date::text LIKE $1', [`${today}%`]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

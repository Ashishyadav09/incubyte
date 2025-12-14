const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware
app.use(cors());
app.use(express.json());

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Admin middleware
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// ============ AUTH ROUTES ============

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    // Check if user exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = email.includes('admin') ? 'admin' : 'user';

    // Create user
    const result = await pool.query(
      'INSERT INTO users (id, email, password, name, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, name, role, created_at',
      [uuidv4(), email, hashedPassword, name, role]
    );

    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

    res.json({
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// ============ SWEETS ROUTES ============

// GET /api/sweets - List all sweets
app.get('/api/sweets', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sweets ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching sweets:', error);
    res.status(500).json({ error: 'Failed to fetch sweets' });
  }
});

// GET /api/sweets/search - Search sweets
app.get('/api/sweets/search', authenticateToken, async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    let query = 'SELECT * FROM sweets WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    if (name) {
      query += ` AND (name ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
      params.push(`%${name}%`);
      paramIndex++;
    }

    if (category && category !== 'All') {
      query += ` AND category = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    if (minPrice) {
      query += ` AND price >= $${paramIndex}`;
      params.push(parseFloat(minPrice));
      paramIndex++;
    }

    if (maxPrice) {
      query += ` AND price <= $${paramIndex}`;
      params.push(parseFloat(maxPrice));
      paramIndex++;
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error searching sweets:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

// POST /api/sweets - Add new sweet (Admin only)
app.post('/api/sweets', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, category, price, quantity, description, image } = req.body;

    if (!name || !category || price === undefined || quantity === undefined) {
      return res.status(400).json({ error: 'Name, category, price, and quantity are required' });
    }

    const result = await pool.query(
      `INSERT INTO sweets (id, name, category, price, quantity, description, image) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [uuidv4(), name, category, price, quantity, description || '', image || '']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding sweet:', error);
    res.status(500).json({ error: 'Failed to add sweet' });
  }
});

// PUT /api/sweets/:id - Update sweet (Admin only)
app.put('/api/sweets/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, quantity, description, image } = req.body;

    const result = await pool.query(
      `UPDATE sweets 
       SET name = COALESCE($1, name),
           category = COALESCE($2, category),
           price = COALESCE($3, price),
           quantity = COALESCE($4, quantity),
           description = COALESCE($5, description),
           image = COALESCE($6, image),
           updated_at = NOW()
       WHERE id = $7
       RETURNING *`,
      [name, category, price, quantity, description, image, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating sweet:', error);
    res.status(500).json({ error: 'Failed to update sweet' });
  }
});

// DELETE /api/sweets/:id - Delete sweet (Admin only)
app.delete('/api/sweets/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM sweets WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    res.json({ message: 'Sweet deleted successfully' });
  } catch (error) {
    console.error('Error deleting sweet:', error);
    res.status(500).json({ error: 'Failed to delete sweet' });
  }
});

// POST /api/sweets/:id/purchase - Purchase sweet
app.post('/api/sweets/:id/purchase', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity = 1 } = req.body;

    // Check current stock
    const sweet = await pool.query('SELECT * FROM sweets WHERE id = $1', [id]);
    if (sweet.rows.length === 0) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    if (sweet.rows[0].quantity < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    // Update quantity
    const result = await pool.query(
      'UPDATE sweets SET quantity = quantity - $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [quantity, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error purchasing sweet:', error);
    res.status(500).json({ error: 'Purchase failed' });
  }
});

// POST /api/sweets/:id/restock - Restock sweet (Admin only)
app.post('/api/sweets/:id/restock', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ error: 'Valid quantity is required' });
    }

    const result = await pool.query(
      'UPDATE sweets SET quantity = quantity + $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [quantity, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error restocking sweet:', error);
    res.status(500).json({ error: 'Restock failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🍬 Sweet Shop API running on port ${PORT}`);
});

module.exports = app;

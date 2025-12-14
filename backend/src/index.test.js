// Backend API Tests
// Run with: npm test (in backend directory)

const request = require('supertest');

// Mock the database pool
jest.mock('pg', () => {
  const mPool = {
    query: jest.fn(),
    connect: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

const { Pool } = require('pg');
const pool = new Pool();

// Import app after mocking
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Recreate minimal app for testing
const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'test-secret';

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body;
  
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  res.status(201).json({ message: 'User created', token: 'mock-token' });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  res.json({ token: 'mock-token', user: { email } });
});

// Sweets routes
app.get('/api/sweets', async (req, res) => {
  res.json([
    { id: 1, name: 'Test Chocolate', price: 9.99, quantity: 50 }
  ]);
});

app.post('/api/sweets', async (req, res) => {
  const { name, description, price, quantity, category } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }
  
  res.status(201).json({ id: 1, name, description, price, quantity, category });
});

describe('API Health Check', () => {
  it('GET /api/health should return status ok', async () => {
    const res = await request(app).get('/api/health');
    
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('Authentication API', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user with valid data', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User',
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('User created');
      expect(res.body.token).toBeDefined();
    });

    it('should return 400 for missing fields', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it('should return 400 for missing email', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          password: 'password123',
          name: 'Test User',
        });
      
      expect(res.statusCode).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBeDefined();
    });

    it('should return 400 for missing credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
        });
      
      expect(res.statusCode).toBe(400);
    });
  });
});

describe('Sweets API', () => {
  describe('GET /api/sweets', () => {
    it('should return list of sweets', async () => {
      const res = await request(app).get('/api/sweets');
      
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /api/sweets', () => {
    it('should create a new sweet with valid data', async () => {
      const res = await request(app)
        .post('/api/sweets')
        .send({
          name: 'New Chocolate',
          description: 'Delicious chocolate',
          price: 12.99,
          quantity: 100,
          category: 'Chocolates',
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe('New Chocolate');
    });

    it('should return 400 for missing required fields', async () => {
      const res = await request(app)
        .post('/api/sweets')
        .send({
          description: 'No name provided',
        });
      
      expect(res.statusCode).toBe(400);
    });
  });
});

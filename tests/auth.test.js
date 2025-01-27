






// __tests__/authController.test.js
import request from 'supertest';
import { app } from '../app';  // Import your app from app.js
import User from '../models/user.js';  // Import the User model directly
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('../models/user.js');  // Mock the User model
jest.mock('bcryptjs');  // Mock bcrypt
jest.mock('jsonwebtoken');  // Mock jsonwebtoken

describe('Auth Controller Tests', () => {
  beforeEach(() => {
    // Reset mock state before each test
    jest.clearAllMocks();
  });

  describe('Register User', () => {
    it('should register a user successfully', async () => {
      const newUser = { email: 'test@example.com', password: 'password123' };
      
      // Directly mock the findOne and create methods on the User model
      User.findOne.mockResolvedValue(null);  // No existing user
      bcrypt.hash.mockResolvedValue('hashedpassword');
      User.create.mockResolvedValue(newUser);

      const response = await request(app)
        .post('/api/register')
        .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User registered successfully');
    });
  });

  // Other test cases for login...
});


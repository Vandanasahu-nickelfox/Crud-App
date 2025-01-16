import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Routes for Registration and Login
router.post('/register', registerUser); // Register a new user
router.post('/login', loginUser); // Login a user and get JWT token

export default router;

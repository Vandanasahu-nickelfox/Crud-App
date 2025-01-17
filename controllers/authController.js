// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/user.js';
// import { body, validationResult } from 'express-validator';

// // User Registration
// export const registerUser = [
//   // Validation for email and password
//   body('email').isEmail().withMessage('Please enter a valid email'), // Check if the email is in correct format
//   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'), // Check if the password has at least 6 characters

//   async (req, res) => {
//     // Check for validation errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       // If there are validation errors, return them in the response
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;

//     try {
//       // Check if the user already exists
//       const userExists = await User.findOne({ where: { email } });
//       if (userExists) return res.status(400).json({ error: 'User already exists' });

//       // Hash the password before storing in the database
//       const hashedPassword = await bcrypt.hash(password, 10);

//       // Create a new user
//       const newUser = await User.create({ email, password: hashedPassword });

//       // Respond with success message
//       res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//       console.error('Error registering user:', error.message);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }
// ];

// // User Login
// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if the user exists
//     const user = await User.findOne({ where: { email } });
//     if (!user) return res.status(400).json({ error: 'Invalid credentials' });

//     // Compare the provided password with the hashed password in the database
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

//     // Generate a JWT token
//     const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     // Respond with the generated token
//     res.status(200).json({ token });
//   } catch (error) {
//     console.error('Error logging in user:', error.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// controllers/authController.js


import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { body } from 'express-validator';
import validate from '../middleware/validationMiddleware.js';  // Import the validation middleware

// User Registration
export const registerUser = [
  // Validation middleware for email and password
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  validate, // Apply the validation middleware

  async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if the user already exists
      const userExists = await User.findOne({ where: { email } });
      if (userExists) return res.status(400).json({ error: 'User already exists' });

      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await User.create({ email, password: hashedPassword });

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
];

// User Login
export const loginUser = [
  // Validation middleware for email and password
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required'),

  validate, // Apply the validation middleware

  async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if the user exists
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(400).json({ error: 'Invalid credentials' });

      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

      // Generate a JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Respond with the generated token
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error logging in user:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
];

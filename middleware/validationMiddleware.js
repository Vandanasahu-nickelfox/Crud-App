// middleware/validationMiddleware.js
import { validationResult } from 'express-validator';

const validate = (req, res, next) => {
  // Get validation errors from the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If there are validation errors, return them in the response
    return res.status(400).json({ errors: errors.array() });
  }
  next(); // Proceed to the next middleware or route handler
};

export default validate;


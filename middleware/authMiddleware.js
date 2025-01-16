import jwt from 'jsonwebtoken';

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token

  if (!token) {
    return res.status(401).json({ error: 'Access denied, token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach decoded user info to request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

export default authenticateJWT;

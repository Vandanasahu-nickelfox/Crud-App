  import express from 'express';
  import dotenv from 'dotenv';
  import sequelize from './config/database.js';
  import todoRoutes from './routes/todoRoutes.js';
  import authRoutes from './routes/authRoutes.js';
  
  dotenv.config();
  const app = express();
  const PORT = process.env.PORT || 4000;
  
  app.use(express.json()); // Middleware to parse JSON requests
  
  // Register the routes
  app.use('/api', authRoutes); // Register auth routes
  app.use('/api/v1', todoRoutes); // Register Todo CRUD routes
  
  // Sync the database and start the server
  sequelize.sync({ logging: console.log }) // Enable Sequelize query logging
    .then(() => {
      console.log('Database connected and synced!');
      app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
    })
    .catch((error) => console.error('Database connection failed:', error.message));
  




    
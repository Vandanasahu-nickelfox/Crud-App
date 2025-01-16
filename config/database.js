import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Ensure the environment variables are loaded

const sequelize = new Sequelize(
  process.env.DB_NAME,       // Database name
  process.env.USER_NAME,     // Username
  process.env.DB_PASSWORD,   // Password
  {
    host: process.env.HOST_NAME,
    dialect: 'postgres',     // Database type
    port: process.env.PORT_NUMBER, // Default PostgreSQL port
    logging: false,  // This will disable SQL query logging in the terminal
  }
);

export default sequelize;






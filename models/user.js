import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Ensures that the email is valid
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;

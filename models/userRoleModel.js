const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserRole = sequelize.define('UserRole', {
  user_role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

sequelize.sync({ force: JSON.parse(process.env.DB_CONFIG_ALLOW_FORCE_SYNC)}); 
module.exports = UserRole;
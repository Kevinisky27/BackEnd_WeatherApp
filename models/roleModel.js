const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Model attributes are defined here
const Role = sequelize.define('Role', {
    role_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = Role;
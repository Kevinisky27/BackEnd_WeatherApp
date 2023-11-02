const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./roleModel');
const UserRole = require('./userRoleModel');

// Model attributes are defined here
const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
});

User.findByEmail = async (email) => {
  return await User.findOne({ where: { email: email } });
}

User.belongsToMany(Role, { through: UserRole , foreignKey: 'user_id' });
Role.belongsToMany(User, { through: UserRole , foreignKey: 'role_id' });

module.exports = User;
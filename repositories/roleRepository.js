const Role = require('../models/roleModel');
const User = require('../models/userModel');
const { Op } = require('sequelize');

const findByDescription = async (searchRoles) => {
    const foundRoles = Role.findAll({
        where: {
          description: {
            [Op.in]: searchRoles,
          },
        },
      })
        .then((roles) => {
          if (roles.length > 0) {
            return roles;
          } else {
            return null;
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    return foundRoles;
}

const findRoleDescriptionByUserId = async (userId) => {
    const descriptions = await User.findByPk(userId, {
        include: Role, // Incluye el modelo Role en la consulta
      })
        .then((user) => {
          if (user) {
            const roles = user.Roles; // Accede a los roles del usuario
            const roleDescriptions = roles.map((role) => role.description); // Obtiene las descripciones de los roles
            return roleDescriptions;
          } else {
            console.log('Usuario no encontrado');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
        return descriptions;
}

module.exports = {
    findByDescription,
    findRoleDescriptionByUserId
}
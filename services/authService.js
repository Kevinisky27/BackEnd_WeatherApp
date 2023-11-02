const jwt = require('jsonwebtoken');
const bcryptUtils = require('../utils/bcryptUtils');
const userRepository = require('../repositories/userRepository');
const roleRepository = require('../repositories/roleRepository');
const userRoleModel = require('../models/userRoleModel');
const UserRole = require('../models/userRoleModel');
const Role = require('../models/roleModel');

const signup = async (user) => {
    try{
        if(user.email !== undefined && user.password !== undefined){
            const userExists = await userRepository.findByEmail(user.email);
            if(userExists){
                return {
                    statusCode: 409,
                    message: 'User already exists'
                };
            }
            const rolesExists = await roleRepository.findByDescription(user.roles);
            if(!rolesExists){
                return{
                    statusCode: 404,
                    message: 'Role does not exist'
                }
            }

            const encryptedPassword = await bcryptUtils.encrypt(user.password);
            user.password = encryptedPassword;
            const createdUser = await userRepository.create(user);

            rolesExists.forEach(role => {
                UserRole.create({
                    user_id: createdUser.user_id,
                    role_id: role.role_id
                });
            });

            return {
                user_id: createdUser.user_id,
                username: createdUser.username,
                email: createdUser.email,
                is_disabled: createdUser.is_disabled
            }
        }
    }catch(error){
        throw error;
    }
}

const login = async (user) => {
    try{
        const userExists = await userRepository.findByEmail(user.email);
        if(userExists){
            let token = null;
            const passwordMatches = await bcryptUtils.compare(user.password, userExists.password);
            if(!passwordMatches){
                console.error("Password does not match");
                return null;
            }

            console.log(userExists.user_id);
            const rolesDecription = await roleRepository.findRoleDescriptionByUserId(userExists.user_id);

            token = jwt.sign({ 
                    email: userExists.email, 
                    roles: rolesDecription
                    }, process.env.SECRET_KEY);
            return {
                token,
                roles: rolesDecription
            };
        }
        return null;
    }catch(error){
        throw error;
    }
}

module.exports = {
    signup,
    login
}
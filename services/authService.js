const jwt = require('jsonwebtoken');
const bcryptUtils = require('../utils/bcryptUtils');
const userRepository = require('../repositories/userRepository');

const signup = async (user) => {
    try{
        if(user.email !== undefined && user.password !== undefined){
            const userExists = await userRepository.findByEmail(user.email);
            if(userExists){
                return null;
            }
            const encryptedPassword = await bcryptUtils.encrypt(user.password);
            user.password = encryptedPassword;
            const createdUser = await userRepository.create(user);
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
            token = jwt.sign({ email: userExists.email }, process.env.SECRET_KEY);
            console.log("Token: " + token);
            return token;
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
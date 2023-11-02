const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const verifyToken = (req, res, next) => {
    try{
        if(!req.headers.authorization) return res.status(401).json({message: "No token provided"});
        const token = req.headers.authorization.split(' ')[1];
        
        if(!token) return res.status(401).json({message: "No token provided"});
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userEmail = decoded.email;
        const user = userService.getUserByEmail(userEmail);
        if(!user) return res.status(401).json({message: "User not found"});
        next();
    }catch(error){
        console.error(error);
        res.status(401).json({
            message: "Unauthorized"
        });
    }
};

module.exports = {
    verifyToken
}
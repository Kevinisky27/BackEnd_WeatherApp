// const userService = require('../services/userService');
const authService = require('../services/authService');

const signup = async (req, res) => {
    try{
        let createdUser = await authService.signup(req.body);
        if(!createdUser){
            res.status(409).json({
                message: 'User already exists'
            });
        }else{
            res.status(201).json({
                user: createdUser
            });
        }
    }catch(error){
        console.error(error);
        res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
}
const login = async (req, res) => {
    const user = req.body;
    const response = await authService.login(user);
    res.status(201).send(response)
    // try{
    //     const user = req.body;
    //     const token = await authService.login(user);
    //     if (token) {
    //         res.status(201).json({
    //             statusCode: 201,
    //             token: token
    //         });
    //     }else{
    //         res.status(404).json({
    //             message: 'User not found'
    //         });
    //     }
    // }catch(error){
    //     console.error(error);
    //     res.status(500).json({
    //         statusCode: 500,
    //         message: error.message
    //     });
    // }
}


module.exports = {
    signup,
    login
}
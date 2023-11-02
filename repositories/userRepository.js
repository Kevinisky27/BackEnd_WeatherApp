const User = require('../models/userModel');
const Role = require('../models/roleModel');

const findAll = async () => {
    const users = await User.findAll();
    return users;
}

const findByEmail = async (email) => {
    const user = await User.findByEmail(email);
    return user;
}

const create = async (user) => {
    const createdUser = await User.create(user);
    return createdUser;
}

module.exports = {
    findAll,
    findByEmail,
    create
}
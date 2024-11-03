const User = require('../models/user.model');
const {
    paginate
} = require('../utils/pagination');

const createUser = async (userData) => {
    return await User.create(userData);
};

const getAllUsers = async (page, limit) => {
    return await paginate(User, page, limit);
};

const getUserById = async (id) => {
    return await User.findById(id);
};

const getUserByEmail = async (email) => {
    return User.findOne({
        email
    });
};

const getUserByName = async (username) => {
    return User.findOne({
        username
    });
};

const updateUser = async (id, updateData) => {
    return await User.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
    });
};

const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByName,
    updateUser,
    deleteUser
};
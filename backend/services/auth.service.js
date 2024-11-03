const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const {
    generateAccessToken,
    generateRefreshToken
} = require('../utils/tokens');
const userService = require('./user.service');

const registerUser = async (userData) => {
    const {
        username,
        email,
        password,
        role,
        profile_picture,
        date_of_birth,
        phone_number,
        address
    } = userData;

    const emailExists = await User.findOne({
        email
    });
    if (emailExists) {
        throw new Error('Email is already registered.');
    }

    const usernameExists = await User.findOne({
        username
    });
    if (usernameExists) {
        throw new Error('Username is already taken.');
    }

    const newUser = new User({
        username,
        email,
        password,
        role: role || 'student',
        profile_picture: profile_picture || null,
        date_of_birth,
        phone_number,
        address,
    });

    await newUser.save();
    return newUser;
};


const loginUserWithEmailAndPassword = async (email, password) => {
    const user = await userService.getUserByEmail(email);
    if (!user) {
        throw new Error('Invalid email or password.');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        throw new Error('Invalid email or password.');
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return {
        accessToken,
        refreshToken,
        user
    };
};

const logoutUser = () => {
    return {
        success: true,
        message: 'Tokens cleared from cookies.'
    };
};

module.exports = {
    registerUser,
    loginUserWithEmailAndPassword,
    logoutUser
};
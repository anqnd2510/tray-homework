const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const {
    generateAccessToken,
    generateRefreshToken,
    generateResetPasswordToken,
    verifyResetPasswordToken
} = require('../utils/tokens');
const jwt = require('jsonwebtoken');

//[POST]/v1/auth/register
module.exports.registerUser = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            role,
            profile_picture,
            date_of_birth,
            phone_number,
            address
        } = req.body;

        const emailExists = await User.findOne({
            email
        });
        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: 'Email is already registered.',
            });
        }
        const usernameExists = await User.findOne({
            username
        });
        if (usernameExists) {
            return res.status(400).json({
                success: false,
                message: 'Username is already taken.',
            });
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
        })

        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'User registered successfully.',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//[POST]/v1/auth/login
module.exports.loginUser = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password.',
            });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password.',
            });
        }
        if (user && validPassword) {
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict'
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict'
            });

            res.status(200).json({
                success: true,
                accessToken: `${accessToken}`,
                refreshToken: `${refreshToken}`,
                message: 'Login successful'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//[POST]/v1/auth/logout
// đang có vấn đề
module.exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.status(200).json({
            success: true,
            message: 'Logout successful. Tokens cleared from cookies.'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
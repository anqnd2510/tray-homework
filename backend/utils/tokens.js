const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAccessToken = (user) => {
    const payload = { _id: user._id, email: user.email, role: user.role };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: `${process.env.JWT_ACCESS_EXPIRATION_MINUTES}m` });
};

const generateRefreshToken = (user) => {
    const payload = { id: user._id, email: user.email, role: user.role };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: `${process.env.JWT_REFRESH_EXPIRATION_DAYS}d` });
};

const generateResetPasswordToken = (user) => {
    const payload = { id: user._id, email: user.email };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: `${process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES}m` });
};

const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

const verifyResetPasswordToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    generateResetPasswordToken,
    verifyAccessToken,
    verifyRefreshToken,
    verifyResetPasswordToken
};
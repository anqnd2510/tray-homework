const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require("dotenv").config();

module.exports.auth = async (req, res, next) => {
    const { authorization } = req.headers;
    if( !authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized access.'
        });
    }
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);
    if(!user) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized access.'
        });
    }
    req.user = user;
    next();
}
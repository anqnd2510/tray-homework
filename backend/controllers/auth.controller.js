const authService = require('../services/auth.service');

//[POST]/v1/auth/register
module.exports.registerUser = async (req, res) => {
    try {
        await authService.registerUser(req.body);
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
        const {
            accessToken,
            refreshToken,
            user
        } = await authService.loginUserWithEmailAndPassword(email, password);

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
            accessToken,
            refreshToken,
            message: 'Login successful'
        });
    } catch (error) {
        res.status(400).json({
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
        const result = authService.logoutUser();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

}
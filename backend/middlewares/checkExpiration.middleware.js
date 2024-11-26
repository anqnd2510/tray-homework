const userServices = require('../services/user.service');

module.exports.checkExpiration = async (req, res, next) => {
    const userId = req.user.id;
    try {
        const user = await userServices.getUserById(userId);

        if (!user || !user.subscription) {
            return res.status(403).json({
                success: false,
                message: 'No active subscription found.'
            });
        }

        const expirationDate = user.subscription;
        if (new Date() > new Date(expirationDate)) {
            return res.status(403).json({
                success: false,
                message: 'Your subscription has expired. Please renew.'
            });
        }

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
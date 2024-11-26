// controllers/payment.controller.js

const paymentService = require('../services/payment.service');

module.exports.initiatePayment = async (req, res) => {
    const {
        user_id,
        amount,
        package
    } = req.body;

    try {
        const response = await paymentService.initiatePayment(user_id, amount, package);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            message: 'Payment initiation failed',
            error: error.message
        });
    }
};

module.exports.handlePaymentNotification = async (req, res) => {
    try {
        await paymentService.handlePaymentNotification(req.body);
        res.status(200).json({
            message: 'Notification received'
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports.createPayment = async (req, res) => {
    const userId = req.body.user_id;
    const {
        package: packageType
    } = req.body;

    try {
        const {
            payment,
            expirationDate
        } = await paymentService.createPayment(userId, packageType);
        res.status(201).json({
            success: true,
            message: 'Payment and transaction created successfully',
            data: {
                payment,
                expirationDate
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Payment creation failed',
            error: error.message
        });
    }
};

module.exports.checkPaymentStatus = async (req, res) => {
    const {
        user_id
    } = req.body;

    try {
        const result = await paymentService.checkPaymentStatus(user_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
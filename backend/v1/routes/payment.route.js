const express = require('express');
const router = express.Router();
const controller = require('../../controllers/payment.controller');

router.post('/initiate', controller.initiatePayment);

router.post('/notify', controller.handlePaymentNotification);

router.post('/create-payment', controller.createPayment);

router.post('/check-payment-status', controller.checkPaymentStatus);
module.exports = router;
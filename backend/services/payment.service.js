const axios = require('axios');
const crypto = require('crypto');
const config = require('../configs/momo.config');
const Payment = require('../models/payment.model');
const Transaction = require('../models/transaction.model');
const User = require('../models/user.model');
const {
    PACKAGE_PRICES
} = require('../configs/packagePrices');
const calculateExpirationDate = require('../utils/calculateExpirationDate');

const initiatePayment = async (user_id, amount, package) => {
    const orderId = config.momo.partnerCode + new Date().getTime();
    const requestId = orderId;
    const orderInfo = 'pay with MoMo';
    const redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
    const ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
    const requestType = 'payWithMethod';
    const extraData = '';
    const autoCapture = true;
    const lang = 'vi';

    const rawSignature = `accessKey=${config.momo.accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${config.momo.partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    const signature = crypto.createHmac('sha256', config.momo.secretKey)
        .update(rawSignature)
        .digest('hex');

    const requestBody = {
        partnerCode: config.momo.partnerCode,
        partnerName: 'Test',
        storeId: 'MomoTestStore',
        requestId,
        amount,
        orderId,
        orderInfo,
        redirectUrl,
        ipnUrl,
        lang,
        requestType,
        autoCapture,
        extraData,
        signature
    };

    const response = await axios.post(config.momo.endpoint, requestBody, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const payment = new Payment({
        user_id,
        amount,
        package,
        date: new Date(),
        createdAt: new Date()
    });

    await payment.save();
    return response.data;
};

const handlePaymentNotification = async (data) => {
    const {
        partnerCode,
        orderId,
        requestId,
        amount,
        orderInfo,
        orderType,
        transId,
        resultCode,
        message,
        payType,
        responseTime,
        extraData,
        signature,
        userId,
        paymentId
    } = data;

    const rawSignature = `partnerCode=${partnerCode}&orderId=${orderId}&requestId=${requestId}&amount=${amount}&orderInfo=${orderInfo}&orderType=${orderType}&transId=${transId}&resultCode=${resultCode}&message=${message}&payType=${payType}&responseTime=${responseTime}&extraData=${extraData}`;
    const expectedSignature = crypto.createHmac('sha256', config.momo.secretKey)
        .update(rawSignature)
        .digest('hex');

    if (signature !== expectedSignature) {
        throw new Error('Invalid signature');
    }

    const status = resultCode === 0 ? 'Success' : 'Failed';

    const transaction = new Transaction({
        user_id: userId,
        payment_id: paymentId,
        transaction_date: new Date(),
        status
    });

    await transaction.save();
};

const createPayment = async (userId, packageType) => {
    if (!['weekly', 'monthly', 'yearly'].includes(packageType)) {
        throw new Error('Invalid package type');
    }

    const amount = PACKAGE_PRICES[packageType];
    const expirationDate = calculateExpirationDate(packageType);

    await User.findByIdAndUpdate(userId, {
        'subscription.package': packageType,
        'subscription.expirationDate': expirationDate
    });

    const payment = await Payment.create({
        user_id: userId,
        amount,
        package: packageType,
        date: new Date()
    });

    await Transaction.create({
        user_id: userId,
        payment_id: payment._id,
        transaction_date: new Date(),
        status: 'Success'
    });

    return {
        payment,
        expirationDate
    };
};

const checkPaymentStatus = async (user_id) => {
    try {
        const payment = await Payment.findOne({
            user_id,
            status: 'Paid'
        });
        return payment ? {
            success: true,
            message: 'Payment received'
        } : {
            success: false,
            message: 'Payment not received yet'
        };
    } catch (error) {
        throw new Error('Failed to check payment status: ' + error.message);
    }
};
module.exports = {
    initiatePayment,
    handlePaymentNotification,
    createPayment,
    checkPaymentStatus
};
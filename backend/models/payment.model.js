const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    package: {
        type: String,
        enum: ['weekly', 'monthly', 'yearly'],
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending'
    },
    date: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
}, {
    timestamps: true,
});

const Payment = mongoose.model('Payment', paymentSchema, 'payments');
module.exports = Payment;
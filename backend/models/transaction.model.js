const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    payment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        required: true
    },
    transaction_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Success', 'Failed'],
        default: 'Success'
    }
}, {
    timestamps: true,
});

const Transaction = mongoose.model('Transaction', transactionSchema, 'transactions');
module.exports = Transaction;
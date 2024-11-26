const Transaction = require('../models/transaction.model');

const getAllTransactions = async () => {
    return await Transaction.find();
};


const getTransactionById = async (transactionId) => {
    return await Transaction.findById(transactionId).populate('user_id').populate('payment_id');
};

const getTransactionsByUserId = async (userId) => {
    return await Transaction.find({
        user_id: userId
    });
};

module.exports = {
    getAllTransactions,
    getTransactionById,
    getTransactionsByUserId
};
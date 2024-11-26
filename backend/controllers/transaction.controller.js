const transactionService = require('../services/transaction.service');

// [GET] /v1/transactions/ 
module.exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await transactionService.getAllTransactions();
        res.status(200).json({
            success: true,
            transactions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// [GET] /v1/transactions/detail/:id 
module.exports.getTransactionById = async (req, res) => {
    const transactionId = req.params.id;
    try {
        const transaction = await transactionService.getTransactionById(transactionId);
        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'Transaction not found'
            });
        }
        res.status(200).json({
            success: true,
            transaction
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// [GET] /v1/transactions/user-transactions/:id 
module.exports.getTransactionsByUserId = async (req, res) => {
    const userId = req.params.userId;
    try {
        const transactions = await transactionService.getTransactionsByUserId(userId);
        res.status(200).json({
            success: true,
            transactions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve user transactions',
            error: error.message
        });
    }
};
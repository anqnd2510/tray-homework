const express = require('express');
const router = express.Router();
const controller = require('../../controllers/transaction.controller');

router.get('/', controller.getAllTransactions);
router.get('/detail/:id', controller.getTransactionById);
router.get('/user-transactions/:userId', controller.getTransactionsByUserId);

module.exports = router;
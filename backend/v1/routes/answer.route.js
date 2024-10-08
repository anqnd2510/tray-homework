const express = require('express');
const router = express.Router();

const controller = require('../../controllers/answer.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

router.post('/', authMiddleware.auth, controller.savedUserAnswer);

router.get('/score/:user_id/:slot_id', authMiddleware.auth, controller.getUserScoreForSlot);

module.exports = router;
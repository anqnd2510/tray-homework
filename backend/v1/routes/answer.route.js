const express = require('express');
const router = express.Router();
const controller = require('../../controllers/answer.controller');

router.post('/', controller.savedUserAnswer);

router.get('/score/:user_id/:slot_id', controller.getUserScoreForSlot);

module.exports = router;
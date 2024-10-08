const express = require('express');
const router = express.Router();

const controller = require("../../controllers/feedback.controller");
const authMiddleware = require('../../middlewares/auth.middleware');

router.post('/submit-feedback', authMiddleware.auth, controller.submitFeedback);

module.exports = router;
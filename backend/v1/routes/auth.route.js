const express = require('express');
const router = express.Router();
const controller = require('../../controllers/auth.controller');
const authmiddleware = require('../../middlewares/auth.middleware');

router.post("/register", controller.registerUser);

router.post("/login", controller.loginUser);

router.post("/logout", authmiddleware.auth, controller.logoutUser);

module.exports = router;
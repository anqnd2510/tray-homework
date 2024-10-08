const express = require('express');
const router = express.Router();

const controller = require("../../controllers/user.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const roleMiddleware = require("../../middlewares/role.middleware");

router.post("/create", authMiddleware.auth, roleMiddleware.checkRole(['admin']), controller.createUser);

router.get("/", authMiddleware.auth, controller.getAllUsers);

router.get("/detail/:id",authMiddleware.auth, controller.getUserById);

router.patch("/update/:id", authMiddleware.auth, roleMiddleware.checkRole(['admin']),controller.updateUser);

router.delete("/delete/:id", authMiddleware.auth, roleMiddleware.checkRole(['admin']),controller.deleteUser);

module.exports = router;

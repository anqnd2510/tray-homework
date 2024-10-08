const express = require('express');
const router = express.Router();
const controller = require("../../controllers/class.controller");
const authMiddleware = require('../../middlewares/auth.middleware');
const roleMiddleware = require('../../middlewares/role.middleware');

router.post("/create", authMiddleware.auth, roleMiddleware.checkRole(['teacher']), controller.createClass);

router.get("/", authMiddleware.auth, controller.getAllClasses);

router.get("/detail/:id", authMiddleware.auth, controller.getClassById);

router.patch("/update/:id", authMiddleware.auth, roleMiddleware.checkRole(['teacher']),controller.updateClass);

router.delete("/delete/:id", authMiddleware.auth, roleMiddleware.checkRole(['teacher']),controller.deleteClass);

router.post("/join", authMiddleware.auth, controller.joinClass);

module.exports = router;
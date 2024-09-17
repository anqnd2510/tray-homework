const express = require('express');
const router = express.Router();

const controller = require("../../controllers/user.controller");

router.post("/create", controller.createUser);

router.get("/", controller.getAllUsers);

router.get("/detail/:id", controller.getUserById);

router.patch("/update/:id", controller.updateUser);

router.delete("/delete/:id", controller.deleteUser);

module.exports = router;

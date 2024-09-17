const express = require('express');
const router = express.Router();

const controller = require("../../controllers/class.controller");

router.post("/create", controller.createClass);

router.get("/", controller.getAllClasses);

router.get("/detail/:id", controller.getClassById);

router.patch("/update/:id", controller.updateClass);

router.delete("/delete/:id", controller.deleteClass);

module.exports = router;
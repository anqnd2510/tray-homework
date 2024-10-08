const express = require('express');
const router = express.Router();

const authMiddleware = require("../../middlewares/auth.middleware");
const controller = require("../../controllers/question.controller");
const roleMiddleware = require("../../middlewares/role.middleware");

router.get('/', authMiddleware.auth, controller.getAllQuestions);

router.get('/detail/:id', authMiddleware.auth, controller.getQuestionById);

router.post('/create', authMiddleware.auth, roleMiddleware.checkRole(['teacher']), controller.createQuestion);

router.delete('/delete/:id', authMiddleware.auth, roleMiddleware.checkRole(['teacher']), controller.deleteQuestion);

router.patch('/update/:id', authMiddleware.auth, roleMiddleware.checkRole(['teacher']), controller.updateQuestion);


module.exports = router;
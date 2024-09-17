const express = require('express');
const router = express.Router();

const controller = require("../../controllers/question.controller");

router.get('/', controller.getAllQuestions);

router.get('/detail/:id', controller.getQuestionById);

router.post('/create', controller.createQuestion);

router.delete('/delete/:id', controller.deleteQuestion);

router.patch('/update/:id', controller.updateQuestion);

module.exports = router;
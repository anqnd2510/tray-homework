const express = require('express');
const router = express.Router();

const authMiddleware = require("../../middlewares/auth.middleware");
const controller = require("../../controllers/question.controller");
const roleMiddleware = require("../../middlewares/role.middleware");

/**
 * @swagger
 * /questions:
 *   get:
 *     summary: Get all questions
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of questions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Question'
 */
router.get('/', authMiddleware.auth, controller.getAllQuestions);

/**
 * @swagger
 * /questions/detail/{id}:
 *   get:
 *     summary: Get a question by ID
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the question
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A question object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Question'
 *       '404':
 *         description: Question not found
 */
router.get('/detail/:id', authMiddleware.auth, controller.getQuestionById);

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateQuestionRequest:
 *       type: object
 *       required:
 *         - user_id
 *         - slot_id
 *         - question_text
 *         - choices
 *       properties:
 *         user_id:
 *           type: string
 *           description: The ID of the user creating the question.
 *           example: "66e7e08046506bba0ba24100"
 *         slot_id:
 *           type: string
 *           description: The ID of the slot associated with the question.
 *           example: "66e943f1d4768dfa61897b59"
 *         question_text:
 *           type: string
 *           description: The text of the question.
 *           example: "Which planet is known as the Red Planet?"
 *         choices:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - choice_text
 *               - is_correct
 *             properties:
 *               choice_text:
 *                 type: string
 *                 description: The text of the choice.
 *                 example: "Venus"
 *               is_correct:
 *                 type: boolean
 *                 description: Indicates whether the choice is correct.
 *                 example: false
 */
/**
 * @swagger
 * /questions/create:
 *   post:
 *     tags: [Questions]
 *     summary: Create a new question
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateQuestionRequest'
 *     responses:
 *       201:
 *         description: Question created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Question'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Slot not found"
 */
router.post('/create', authMiddleware.auth, roleMiddleware.checkRole(['teacher']), controller.createQuestion);


/**
 * @swagger
 * /questions/delete/{id}:
 *   delete:
 *     summary: Delete a question by ID
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the question to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Question deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       '404':
 *         description: Question not found
 */
router.delete('/delete/:id', authMiddleware.auth, roleMiddleware.checkRole(['teacher']), controller.deleteQuestion);

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateQuestionRequest:
 *       type: object
 *       required:
 *         - question_text
 *         - choices
 *       properties:
 *         question_text:
 *           type: string
 *           description: The updated text of the question.
 *           example: "Which planet is known as the Super Red Planet 123?"
 *         choices:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - choice_text
 *             properties:
 *               choice_text:
 *                 type: string
 *                 description: The text of the choice.
 *                 example: "Venus"
 *               is_correct:
 *                 type: boolean
 *                 description: Indicates whether the choice is correct.
 *                 example: false
 *               _id:
 *                 type: string
 *                 description: The ID of the choice (if updating existing choices).
 *                 example: "66e99e28fe3c3eb39d9331d6"
 */
/**
 * @swagger
 * /questions/update/{id}:
 *   patch:
 *     tags: [Questions]
 *     summary: Update an existing question
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the question to update
 *         schema:
 *           type: string
 *           example: "66e99e28fe3c3eb39d9331d5"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateQuestionRequest'
 *     responses:
 *       200:
 *         description: Question updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Question'
 *       404:
 *         description: Question not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Question not found"
 */
router.patch('/update/:id', authMiddleware.auth, roleMiddleware.checkRole(['teacher']), controller.updateQuestion);

/**
 * @swagger
 *  /questions/slot/{slotId}:
 *   get:
 *     summary: Get questions by slot ID
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: slotId
 *         in: path
 *         required: true
 *         description: The ID of the slot to retrieve questions for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of questions for the specified slot
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                   description: Total number of questions returned
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Question'
 *       '404':
 *         description: Questions not found for the given slot ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *                   example: "Question not found"
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/slot/:slotId', authMiddleware.auth, controller.getQuestionBySlotId);

module.exports = router;
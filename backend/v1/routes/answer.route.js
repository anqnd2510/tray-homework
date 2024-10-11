const express = require('express');
const router = express.Router();

const controller = require('../../controllers/answer.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     UserAnswerRequest:
 *       type: object
 *       required:
 *         - user_id
 *         - slot_id
 *         - answers
 *       properties:
 *         user_id:
 *           type: string
 *           description: The ID of the user who submitted the answers.
 *           example: "66f38b9197a43b5f500259f6"
 *         slot_id:
 *           type: string
 *           description: The ID of the slot associated with the answers.
 *           example: "66e943f1d4768dfa61897b59"
 *         answers:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - question_id
 *               - selected_choice
 *             properties:
 *               question_id:
 *                 type: string
 *                 description: The ID of the question.
 *                 example: "66e99e03fe3c3eb39d9331bd"
 *               selected_choice:
 *                 type: string
 *                 description: The text of the selected choice.
 *                 example: "Mars"
 * 
 * /answers:
 *   post:
 *     tags: [Answers]
 *     summary: Save user answers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserAnswerRequest'
 *     responses:
 *       200:
 *         description: User answers saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User answers saved successfully"
 *       500:
 *         description: Internal server error
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
 *                   example: "Error message"
 */
router.post('/', authMiddleware.auth, controller.savedUserAnswer);


/**
 * @swagger
 * /answers/score/{user_id}/{slot_id}:
 *   get:
 *     tags: [Answers]
 *     summary: Get user score for a specific slot
 *     parameters:
 *       - name: user_id
 *         in: path
 *         required: true
 *         description: The ID of the user.
 *         schema:
 *           type: string
 *           example: "66e7e08046506bba0ba24100"
 *       - name: slot_id
 *         in: path
 *         required: true
 *         description: The ID of the slot.
 *         schema:
 *           type: string
 *           example: "66e943f1d4768dfa61897b59"
 *     responses:
 *       200:
 *         description: User score retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserScoreResponse'
 *       404:
 *         description: No answers found for this user and slot
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
 *                   example: "No answers found for this user and slot"
 *       500:
 *         description: Internal server error
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
 *                   example: "Error message"
 */
router.get('/score/:user_id/:slot_id', authMiddleware.auth, controller.getUserScoreForSlot);

module.exports = router;
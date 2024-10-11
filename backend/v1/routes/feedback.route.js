const express = require('express');
const router = express.Router();

const controller = require("../../controllers/feedback.controller");
const authMiddleware = require('../../middlewares/auth.middleware');
const roleMiddleware = require("../../middlewares/role.middleware");

/**
 * @swagger
 * /feedbacks/:
 *   get:
 *     tags: [Feedback]
 *     summary: Retrieve all feedbacks
 *     security:
 *       - bearerAuth: []  # Assuming you're using JWT for authentication
 *     responses:
 *       200:
 *         description: A list of feedbacks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user_id:
 *                         type: string
 *                         example: "66f38b9197a43b5f500259f6"
 *                       class_id:
 *                         type: string
 *                         example: "66fa6f35b13fb1d0dc91cb5d"
 *                       start_date:
 *                         type: string
 *                         format: date
 *                         example: "2024-01-01"
 *                       end_date:
 *                         type: string
 *                         format: date
 *                         example: "2024-06-01"
 *                       description:
 *                         type: string
 *                         example: "The teacher was very helpful and explained the concepts clearly."
 *                       love_teacher:
 *                         type: integer
 *                         example: 5
 *                       love_class:
 *                         type: integer
 *                         example: 4
 *       401:
 *         description: Unauthorized, user must log in
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
 *                   example: "Unauthorized"
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
router.get('/', authMiddleware.auth, roleMiddleware.checkRole(['teacher']), controller.getAllFeedbacks);

/**
 * @swagger
 * components:
 *   schemas:
 *     FeedbackRequest:
 *       type: object
 *       required:
 *         - class_id
 *         - description
 *         - love_teacher
 *         - love_class
 *       properties:
 *         class_id:
 *           type: string
 *           description: The ID of the class for which feedback is being submitted.
 *           example: "66fa6f35b13fb1d0dc91cb5d"
 *         description:
 *           type: string
 *           description: The feedback description.
 *           example: "The teacher was very helpful and explained the concepts clearly."
 *         love_teacher:
 *           type: integer
 *           description: Rating for the teacher (1 to 5).
 *           example: 5
 *         love_class:
 *           type: integer
 *           description: Rating for the class (1 to 5).
 *           example: 4
 * 
 * /feedbacks/submit-feedback:
 *   post:
 *     tags: [Feedback]
 *     summary: Submit feedback for a class
 *     security:
 *       - bearerAuth: []  # Assuming you're using JWT for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeedbackRequest'
 *     responses:
 *       201:
 *         description: Feedback submitted successfully
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
 *                   example: "Feedback submitted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: string
 *                       example: "66f38b9197a43b5f500259f6"
 *                     class_id:
 *                       type: string
 *                       example: "66fa6f35b13fb1d0dc91cb5d"
 *                     start_date:
 *                       type: string
 *                       format: date
 *                       example: "2024-01-01"
 *                     end_date:
 *                       type: string
 *                       format: date
 *                       example: "2024-06-01"
 *                     description:
 *                       type: string
 *                       example: "The teacher was very helpful and explained the concepts clearly."
 *                     love_teacher:
 *                       type: integer
 *                       example: 5
 *                     love_class:
 *                       type: integer
 *                       example: 4
 *       403:
 *         description: Only students can submit feedback
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
 *                   example: "Only students can submit feedback"
 *       404:
 *         description: Class not found
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
 *                   example: "Class not found"
 *       400:
 *         description: User associated with the class is not a teacher
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
 *                   example: "The user associated with the class is not a teacher"
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
router.post('/submit-feedback', authMiddleware.auth, roleMiddleware.checkRole(['student']), controller.submitFeedback);

module.exports = router;
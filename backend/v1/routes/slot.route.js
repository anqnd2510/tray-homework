const express = require('express');
const router = express.Router();

const controller = require('../../controllers/slot.controller');
const authMiddleware = require("../../middlewares/auth.middleware");
const roleMiddleware = require("../../middlewares/role.middleware");

/**
 * @swagger
 * /slots/create:
 *   post:
 *     summary: Create a new slot
 *     tags: [Slots]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - class_id
 *               - slot_name
 *               - date
 *               - start_time
 *               - to_time
 *               - time_limit
 *               - release_date
 *               - due_date
 *             properties:
 *               class_id:
 *                 type: string
 *                 format: objectId
 *                 example: "507f1f77bcf86cd799439011"
 *                 description: The ID of the associated class
 *               slot_name:
 *                 type: string
 *                 example: "Introduction to E-Commerce 123"
 *                 description: The name of the slot
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-09-20T00:00:00.000Z"
 *                 description: The date of the slot (in ISO format)
 *               start_time:
 *                 type: string
 *                 example: "12:30"
 *                 description: The start time of the slot
 *               to_time:
 *                 type: string
 *                 example: "14:45"
 *                 description: The end time of the slot
 *               time_limit:
 *                 type: number
 *                 example: 120
 *                 description: Time limit in minutes
 *               description:
 *                 type: string
 *                 example: "This slot covers the basics of e-commerce"
 *                 description: Optional description of the slot
 *               release_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-09-19T00:00:00.000Z"
 *                 description: The date when the slot becomes available
 *               due_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-09-21T23:59:59.000Z"
 *                 description: The deadline for the slot
 *               status:
 *                 type: string
 *                 enum: ['Not started', 'Ongoing', 'Completed']
 *                 default: 'Not started'
 *                 example: "Not started"
 *                 description: The current status of the slot
 *               questions:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: objectId
 *                 example: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"]
 *                 description: Array of question IDs associated with the slot
 *     responses:
 *       201:
 *         description: Slot created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       format: objectId
 *                     class_id:
 *                       type: string
 *                       format: objectId
 *                     slot_name:
 *                       type: string
 *                     date:
 *                       type: string
 *                       format: date-time
 *                     start_time:
 *                       type: string
 *                     to_time:
 *                       type: string
 *                     time_limit:
 *                       type: number
 *                     description:
 *                       type: string
 *                     release_date:
 *                       type: string
 *                       format: date-time
 *                     due_date:
 *                       type: string
 *                       format: date-time
 *                     status:
 *                       type: string
 *                     questions:
 *                       type: array
 *                       items:
 *                         type: string
 *                         format: objectId
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Bad request, validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Validation error: slot_name is required"
 *       403:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Access denied"
 */
router.post('/create', authMiddleware.auth, roleMiddleware.checkRole(['teacher']), controller.createSlot);

/**
 * @swagger
 * /slots:
 *   get:
 *     summary: Get all slots
 *     tags: [Slots]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of slots
 *       403:
 *         description: Unauthorized access
 */
router.get('/', authMiddleware.auth, controller.getAllSlots);

/**
 * @swagger
 * /slots/detail/{id}:
 *   get:
 *     summary: Get a slot by ID
 *     tags: [Slots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the slot
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Slot details
 *       404:
 *         description: Slot not found
 *       403:
 *         description: Unauthorized access
 */
router.get('/detail/:id', authMiddleware.auth, controller.getSlotById);

/**
 * @swagger
 * /slots/update/{id}:
 *   patch:
 *     summary: Update an existing slot
 *     tags: [Slots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the slot to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slot_name:
 *                 type: string
 *                 example: "Introduction to E-Commerce 123"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-09-20T00:00:00.000Z"
 *               start_time:
 *                 type: string
 *                 example: "12:30"
 *               end_time:
 *                 type: string
 *                 example: "14:45"
 *               status:
 *                 type: string
 *                 example: "Ongoing"
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                 example: []
 *     responses:
 *       200:
 *         description: Slot updated successfully
 *       400:
 *         description: Bad request, validation error
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: Slot not found
 */
router.patch('/update/:id', authMiddleware.auth, roleMiddleware.checkRole(['teacher']), controller.updateSlot);

/**
 * @swagger
 * /slots/delete/{id}:
 *   delete:
 *     summary: Delete a slot
 *     tags: [Slots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the slot to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Slot deleted successfully
 *       404:
 *         description: Slot not found
 *       403:
 *         description: Unauthorized access
 */
router.delete('/delete/:id', authMiddleware.auth, roleMiddleware.checkRole(['teacher']), controller.deleteSlot);

/**
 * @swagger
 * /slots/class/{classId}:
 *   get:
 *     tags: [Slots]
 *     summary: Retrieve slots by class ID
 *     parameters:
 *       - name: classId
 *         in: path
 *         required: true
 *         description: The ID of the class to retrieve slots for
 *         schema:
 *           type: string
 *           example: "60b7d8f4b36f9b2f10c3e8a5"
 *     responses:
 *       200:
 *         description: A list of slots for the specified class
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60b7d8f4b36f9b2f10c3e8a6"
 *                       class_id:
 *                         type: string
 *                         example: "60b7d8f4b36f9b2f10c3e8a5"
 *                       slot_name:
 *                         type: string
 *                         example: "Morning Slot"
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2024-01-01"
 *                       start_time:
 *                         type: string
 *                         example: "09:00"
 *                       to_time:
 *                         type: string
 *                         example: "10:00"
 *                       time_limit:
 *                         type: integer
 *                         example: 60
 *                       description:
 *                         type: string
 *                         example: "This is a morning slot for class activities."
 *                       release_date:
 *                         type: string
 *                         format: date
 *                         example: "2023-12-01"
 *                       due_date:
 *                         type: string
 *                         format: date
 *                         example: "2024-01-01"
 *                       status:
 *                         type: string
 *                         enum: ["Not started", "Ongoing", "Completed"]
 *                         example: "Not started"
 *       404:
 *         description: No slots found for the specified class
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Slots not found"
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
 *                 error:
 *                   type: string
 *                   example: "Server Error"
 */
router.get('/class/:classId', authMiddleware.auth, controller.getSlotsByClassId);

module.exports = router;
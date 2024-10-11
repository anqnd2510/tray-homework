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
 *             properties:
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
 *               end_time:
 *                 type: string
 *                 example: "14:45"
 *                 description: The end time of the slot
 *               status:
 *                 type: string
 *                 example: "Ongoing"
 *                 description: The current status of the slot
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                 example: []
 *                 description: Array of questions associated with the slot
 *     responses:
 *       201:
 *         description: Slot created successfully
 *       400:
 *         description: Bad request, validation error
 *       403:
 *         description: Unauthorized access
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

module.exports = router;
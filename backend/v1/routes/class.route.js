const express = require('express');
const router = express.Router();
const controller = require("../../controllers/class.controller");
const authMiddleware = require('../../middlewares/auth.middleware');
const roleMiddleware = require('../../middlewares/role.middleware');

/**
 * @swagger
 * /classes/create:
 *   post:
 *     summary: Create a new class
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               class_name:
 *                 type: string
 *                 example: "Math"
 *                 description: Name of the class
 *               user_id:
 *                 type: string
 *                 example: "66fa6f18b13fb1d0dc91cb55"
 *                 description: Teacher's user ID
 *               description:
 *                 type: string
 *                 example: "Advanced Mathematics for 10th grade students."
 *                 description: A description of the class
 *               zip_code:
 *                 type: string
 *                 example: "12345"
 *                 description: Zip code where the class is held
 *               student_limit:
 *                 type: number
 *                 example: 30
 *                 description: Maximum number of students allowed
 *               number_of_students:
 *                 type: number
 *                 example: 10
 *                 description: Current number of students
 *               from_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-09-01T08:00:00Z"
 *                 description: Start date of the class (in ISO format)
 *               to_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-12-01T17:00:00Z"
 *                 description: End date of the class (in ISO format)
 *               slots:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["66e943f1d4768dfa61897b59"]
 *                 description: Array of slot IDs for the class
 *     responses:
 *       201:
 *         description: Class created successfully
 *       400:
 *         description: Bad request, validation error
 *       403:
 *         description: Unauthorized access
 */
router.post("/create", authMiddleware.auth, roleMiddleware.checkRole(['teacher']), controller.createClass);

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Get all classes
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all classes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   class_name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   from_date:
 *                     type: string
 *                     format: date
 *                   to_date:
 *                     type: string
 *                     format: date
 *                   student_limit:
 *                     type: number
 *                   number_of_students:
 *                     type: number
 *       403:
 *         description: Unauthorized access
 */
router.get("/", authMiddleware.auth, controller.getAllClasses);

/**
 * @swagger
 * /classes/detail/{id}:
 *   get:
 *     summary: Get a class by ID
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the class to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Class details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 class_name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 from_date:
 *                   type: string
 *                   format: date
 *                 to_date:
 *                   type: string
 *                   format: date
 *                 student_limit:
 *                   type: number
 *                 number_of_students:
 *                   type: number
 *                 slots:
 *                   type: array
 *                   items:
 *                     type: string
 *                 student_list:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Class not found
 *       403:
 *         description: Unauthorized access
 */
router.get("/detail/:id", authMiddleware.auth, controller.getClassById);

/**
 * @swagger
 * /classes/update/{id}:
 *   patch:
 *     summary: Update an existing class
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the class to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               class_name:
 *                 type: string
 *                 example: "Math"
 *               user_id:
 *                 type: string
 *                 example: "66fa6f18b13fb1d0dc91cb55"
 *               description:
 *                 type: string
 *                 example: "Advanced Mathematics for 10th grade students."
 *               zip_code:
 *                 type: string
 *                 example: "12345"
 *               student_limit:
 *                 type: number
 *                 example: 30
 *               number_of_students:
 *                 type: number
 *                 example: 10
 *               from_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-09-01T08:00:00Z"
 *               to_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-12-01T17:00:00Z"
 *               slots:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["66e943f1d4768dfa61897b59"]
 *     responses:
 *       200:
 *         description: Class updated successfully
 *       400:
 *         description: Bad request, validation error
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: Class not found
 */
router.patch("/update/:id", authMiddleware.auth, roleMiddleware.checkRole(['teacher']), controller.updateClass);

/**
 * @swagger
 * /classes/delete/{id}:
 *   delete:
 *     summary: Delete a class by ID
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the class to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Class deleted successfully
 *       404:
 *         description: Class not found
 *       403:
 *         description: Unauthorized access
 */
router.delete("/delete/:id", authMiddleware.auth, roleMiddleware.checkRole(['teacher']), controller.deleteClass);

/**
 * @swagger
 * /classes/join:
 *   post:
 *     summary: Join a class
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nhat Minh"
 *                 description: Name of the student joining the class
 *               className:
 *                 type: string
 *                 example: "Math"
 *                 description: Name of the class to join
 *               zipCode:
 *                 type: string
 *                 example: "12345"
 *                 description: Zip code of the class
 *     responses:
 *       200:
 *         description: Successfully joined the class
 *       400:
 *         description: Bad request, validation error
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: Class not found
 */
router.post("/join", authMiddleware.auth, controller.joinClass);

module.exports = router;
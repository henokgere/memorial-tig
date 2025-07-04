const express = require('express');
const router = express.Router();
const { getFeedbacks, createFeedback, deleteFeedback } = require('../controllers/feedbackController');
const { protect, admin } = require('../../../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Feedbacks
 *   description: Feedback API
 */

/**
 * @swagger
 * /api/feedbacks:
 *   get:
 *     summary: Get all feedback
 *     tags: [Feedbacks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of feedbacks
 *   post:
 *     summary: Submit feedback
 *     tags: [Feedbacks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               email:
 *                 type: string
 *                 example: jane@example.com
 *               message:
 *                 type: string
 *                 example: I love your website!
 *     responses:
 *       201:
 *         description: Feedback submitted successfully
 */
router.route('/')
  .get(protect, getFeedbacks)
  .post(createFeedback);

/**
 * @swagger
 * /api/feedbacks/{id}:
 *   delete:
 *     summary: Delete a feedback
 *     tags: [Feedbacks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Feedback ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Feedback deleted
 */
router.route('/:id')
  .delete(protect, deleteFeedback);

module.exports = router;

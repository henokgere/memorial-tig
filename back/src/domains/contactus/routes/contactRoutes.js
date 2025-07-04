const express = require('express');
const router = express.Router();
const { protect } = require('../../../middlewares/authMiddleware');
// const {adminOnly} = require('../../../middlewares/adminMiddleware');

const {submitContactForm, getContactMessages} = require('../controllers/contact');
// const { protect } = require('../../../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Contact form messages
 */

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Submit a new contact message
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - subject
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               email:
 *                 type: string
 *                 example: jane@example.com
 *               subject:
 *                 type: string
 *                 example: donation
 *               message:
 *                 type: string
 *                 example: I'd love to support your cause!
 *     responses:
 *       201:
 *         description: Message submitted
 */
router.post('/', submitContactForm);
router.get('/', protect, getContactMessages);

module.exports = router;

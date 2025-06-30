// src/domains/memorials/routes/memorialRoutes.js
const express = require('express');
const router = express.Router();
const {
  getMemorials,
  getMemorial,
  createMemorial,
  updateMemorial,
  deleteMemorial
} = require('../controllers/memorialController');
const { protect } = require('../../../middlewares/authMiddleware');
const upload = require('../../../middlewares/uploadMiddleware');

/**
 * @swagger
 * tags:
 *   name: Memorials
 *   description: Memorial API
 */

/**
 * @swagger
 * /api/memorials:
 *   get:
 *     summary: Get all memorials
 *     tags: [Memorials]
 *     responses:
 *       200:
 *         description: List of memorials
 *   post:
 *     summary: Create a new memorial
 *     tags: [Memorials]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               fatherName:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Memorial created successfully
 */
router.route('/')
  .get(getMemorials)
  .post(protect, upload.single('image'), createMemorial);

/**
 * @swagger
 * /api/memorials/{id}:
 *   get:
 *     summary: Get memorial by ID
 *     tags: [Memorials]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Memorial details
 *   put:
 *     summary: Update a memorial
 *     tags: [Memorials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated successfully
 *   delete:
 *     summary: Delete a memorial
 *     tags: [Memorials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       204:
 *         description: Deleted
 */
router.route('/:id')
  .get(getMemorial)
  .put(protect, updateMemorial)
  .delete(protect, deleteMemorial);

module.exports = router;

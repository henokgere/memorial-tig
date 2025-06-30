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
 *             required:
 *               - name
 *               - fatherName
 *               - birthDate
 *               - deathDate
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Girmay Teklay"
 *               fatherName:
 *                 type: string
 *                 example: "Teklay Hagos"
 *               grandfatherName:
 *                 type: string
 *                 example: "Hagos Girmay"
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 example: "1950-01-01"
 *               deathDate:
 *                 type: string
 *                 format: date
 *                 example: "2020-06-01"
 *               placeOfBirth:
 *                 type: string
 *                 example: "Mekelle, Tigray"
 *               placeOfDeath:
 *                 type: string
 *                 example: "Adigrat, Tigray"
 *               causeOfDeath:
 *                 type: string
 *                 example: "Conflict"
 *               burialLocation:
 *                 type: string
 *                 example: "Martyrs Cemetery"
 *               familyMember:
 *                 type: string
 *                 example: "Son"
 *               shortStory:
 *                 type: string
 *                 example: "He was a brave freedom fighter..."
 *               memorialMessage:
 *                 type: string
 *                 example: "We will never forget your sacrifice."
 *               obituary:
 *                 type: string
 *                 example: "Passed away in the line of duty..."
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Memorial created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
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

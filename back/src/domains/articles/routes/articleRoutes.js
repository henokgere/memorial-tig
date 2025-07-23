// src/domains/articles/routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  getRelatedArticles,
  searchArticles,
  getArticleArchive,
  getArticlesByArchive,
  addComment,
  getArticleYears
} = require('../controllers/articleController');
const { protect } = require('../../../middlewares/authMiddleware');
const upload = require('../../../middlewares/uploadMiddleware');

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: Article API
 */

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Get all articles
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: List of articles
 *   post:
 *     summary: Create a new article
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - excerpt
 *               - content
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *                 example: The Rise of Tigray Voices
 *               excerpt:
 *                 type: string
 *                 example: A short summary of the article goes here.
 *               content:
 *                 type: string
 *                 example: Full article content with potential formatting.
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Tigray", "War", "Peace"]
 *               author:
 *                 type: string
 *                 description: MongoDB ObjectId of the author
 *                 example: 60f6c1b2c9e77b001c4e8abc
 *               status:
 *                  type: string
 *                  enum: [published, not-published]
 *               image:
 *                 type: string
 *                 format: binary
 *               video:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Article created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.route('/')
  .get(getArticles)
  .post(protect, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
    { name: 'file', maxCount: 1 }
  ]), createArticle);

router.route('/search').get(searchArticles);

  // Route
router.route('/years').get(getArticleYears);

/**
 * @swagger
 * /api/articles/archive:
 *   get:
 *     summary: Get article archives
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: Archive list
 */
router.get('/archive', getArticleArchive);

/**
 * @swagger
 * /api/articles/archive/{year}:
 *   get:
 *     summary: Get articles for a given year
 *     tags: [Articles]
 */
router.get('/archive/:year', getArticlesByArchive);
router.get('/archive/:year/:month', getArticlesByArchive);

/**
 * @swagger
 * /api/articles/{slug}:
 *   get:
 *     summary: Get article by slug
 *     tags: [Articles]
 */
router.get('/:slug', getArticle);

/**
 * @swagger
 * /api/articles/{slug}/related:
 *   get:
 *     summary: Get related articles
 *     tags: [Articles]
 */
router.get('/:slug/related', getRelatedArticles);

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Update an article
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     summary: Delete an article
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 */
router.route('/:id')
  .put(protect, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
    { name: 'file', maxCount: 1 }
  ]), updateArticle)
  .delete(protect, deleteArticle);

/**
 * @swagger
 * /api/articles/{id}/comments:
 *   post:
 *     summary: Add comment to article
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 */
router.post('/:id/comments', protect, addComment);

module.exports = router;

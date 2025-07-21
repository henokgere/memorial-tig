/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Manage books and writings
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of all books
 */

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
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
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [fiction, non-fiction, poetry, biography, essay, other]
 *               bookUrl:
 *                 type: string
 *                 format: uri
 *               coverImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Book created
 */

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a single book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book found
 *       404:
 *         description: Book not found
 */

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               bookUrl:
 *                 type: string
 *                 format: uri
 *               coverImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Book updated
 *       404:
 *         description: Not found
 */

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted
 *       404:
 *         description: Not found
 */

const express = require('express');
const router = express.Router();
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  searchBooks
} = require('../controllers/bookController');
const { protect } = require('../../../middlewares/authMiddleware');
const upload = require('../../../middlewares/uploadMiddleware');

router.route('/')
  .get(getBooks)
  .post(protect, upload.single('coverImage'), createBook);
  
/**
 * @swagger
 * /api/books/search:
 *   get:
 *     summary: Search books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query (searches title, author, description)
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter by title
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filter by author
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [fiction, non-fiction, poetry, biography, essay, other]
 *         description: Filter by category
 *       - in: query
 *         name: yearFrom
 *         schema:
 *           type: integer
 *         description: Filter by creation year (from)
 *       - in: query
 *         name: yearTo
 *         schema:
 *           type: integer
 *         description: Filter by creation year (to)
 *     responses:
 *       200:
 *         description: List of matching books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/search', searchBooks);

router.route('/:id')
  .get(getBook)
  .put(protect, upload.single('coverImage'), updateBook)
  .delete(protect, deleteBook);


module.exports = router;

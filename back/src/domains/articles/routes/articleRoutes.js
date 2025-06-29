const express = require('express');
const router = express.Router();
const {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  getRelatedArticles,
  getArticleArchive,
  getArticlesByArchive,
  addComment
} = require('../controllers/articleController');
const { protect } = require('../../../middlewares/authMiddleware');
const upload = require('../../../middlewares/uploadMiddleware');

router.route('/')
  .get(getArticles)
  .post(protect, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
  ]), createArticle);

router.route('/archive')
  .get(getArticleArchive);

router.route('/archive/:year')
  .get(getArticlesByArchive);

router.route('/archive/:year/:month')
  .get(getArticlesByArchive);

router.route('/:slug')
  .get(getArticle);

router.route('/:slug/related')
  .get(getRelatedArticles);

router.route('/:id')
  .put(protect, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
  ]), updateArticle)
  .delete(protect, deleteArticle);

router.route('/:id/comments')
  .post(protect, addComment);

module.exports = router;
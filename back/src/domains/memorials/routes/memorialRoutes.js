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

router.route('/')
  .get(getMemorials)
  .post(protect, createMemorial);

router.route('/:id')
  .get(getMemorial)
  .put(protect, updateMemorial)
  .delete(protect, deleteMemorial);

module.exports = router;
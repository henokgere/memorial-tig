const express = require("express");
const router = express.Router();
const { getStats } = require("../controllers/statsController");

// @route   GET /api/stats
// @desc    Get platform statistics
// @access  Public
router.get("/", getStats);

module.exports = router;

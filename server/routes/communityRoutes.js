const express = require('express');
const router = express.Router();
const { getCommunities, createCommunity } = require('../controllers/communityController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getCommunities).post(protect, createCommunity);

module.exports = router;

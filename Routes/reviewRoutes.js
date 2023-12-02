const express = require('express');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

// Review routes
router.post('/reviews', reviewController.createReview);
router.get('/reviews', reviewController.getReviews);
router.get('/reviews/:reviewId', reviewController.getReviewById);
router.put('/reviews/:reviewId', reviewController.updateReview);
router.delete('/reviews/:reviewId', reviewController.deleteReview);

module.exports = router;

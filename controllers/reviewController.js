const { Review } = require('../Models/reviewModel');

// Controller functions
const createReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.reviewId, req.body, { new: true });
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteReview = async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.reviewId);
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview,
};

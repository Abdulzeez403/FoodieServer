const express = require('express');
const restaurantController = require('../controllers/restaurantController');

const router = express.Router();

// Restaurant routes
router.post('/restaurants', restaurantController.createRestaurant);
router.get('/restaurants', restaurantController.getRestaurants);
router.get('/restaurants/:restaurantId', restaurantController.getRestaurantById);
router.put('/restaurants/:restaurantId', restaurantController.updateRestaurant);
router.delete('/restaurants/:restaurantId', restaurantController.deleteRestaurant);

module.exports = router;

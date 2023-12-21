const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

// Order routes
router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getOrders);
router.get('/orders/:userId', orderController.getUserOrders);
router.get('/orders/:orderId', orderController.getOrderById);
router.put('/orders/:orderId', orderController.updateOrder);
router.delete('/orders/:orderId', orderController.deleteOrder);

module.exports = router;

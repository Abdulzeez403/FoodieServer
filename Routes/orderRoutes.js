const express = require('express');
const { createOrder, getOrders, getUserOrders, getOrderById, updateOrder, deleteOrder } = require('../controllers/orderController');

const router = express.Router();
router.get('/orders/:userId', getUserOrders); // Corrected route definition

// Use router.route for concise route definitions with the same path
router.route("/order/:orderId")
    .get(getOrderById)
    .put(updateOrder)
    .delete(deleteOrder);

// Order routes
router.post('/orders', createOrder);
router.get('/orders', getOrders);
module.exports = router;

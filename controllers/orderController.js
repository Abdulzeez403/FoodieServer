const OrderSchema = require('../Models/orderModel');
const cartSchema = require("../Models/cartModel")

// Controller functions
const createOrder = async (req, res) => {
    try {
        const { userId, totalAmount, status } = req.body;

        // Use findOne instead of find to get a single cart
        const cart = await cartSchema.find({ userId });

        if (!cart) {
            // If cart is not found, return an error response
            return res.status(404).json({
                success: false,
                error: 'Cart not found for the specified userId',
            });
        }

        const order = new OrderSchema({
            userId,
            cart,
            totalAmount,
            status,
        });

        const createdOrder = await order.save();

        return res.json({
            success: true,
            message: 'Order created successfully',
            data: createdOrder,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};


const getOrders = async (req, res) => {
    try {
        const orders = await OrderSchema.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserOrders = async (req, res) => {
    const userId = req.params;
    try {
        const orders = await OrderSchema.find(userId);

        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOrderById = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const order = await OrderSchema.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const order = await OrderSchema.findByIdAndUpdate(req.params.orderId, req.body, { new: true });
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        await OrderSchema.findByIdAndDelete(req.params.orderId);
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getUserOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
};

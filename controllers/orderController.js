const OrderSchema = require('../Models/orderModel');
const menuItemSchema = require("../Models/menuItemModel")

// Controller functions
const createOrder = async (req, res) => {
    try {
        const { userId, items, totalAmount, status, } = req.body;

        // Ensure that each item in the `items` array has a `menuItem` field
        if (items.some(item => !item.menuItem)) {
            return res.status(400).json({
                success: false,
                error: 'Each item in the order must have a menuItem field.',
            });
        }

        // Fetch actual MenuItem documents for each item
        const itemsWithMenuItems = await Promise.all(
            items.map(async ({ menuItem, quantity }) => {
                const menuId = await menuItemSchema.findById(menuItem);
                return { menuItem: menuId, quantity };
            })
        );
        const order = new OrderSchema({
            userId,
            items: itemsWithMenuItems,
            totalAmount,
            status,
        });
        const createOrder = await order.save()
        return res.json({ success: true, message: 'Order created successfully', data: createOrder });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
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
    try {
        const order = await OrderSchema.findById(req.params.orderId);
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

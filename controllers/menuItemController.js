const MenuItem = require('../Models/menuItemModel');
const { mapFiles } = require("../Middlewares/file")

// Controller functions
const createMenuItem = async (req, res) => {

    try {
        const { name, description, images, price, soldout } = req.body;
        // const { userId } = req.params;
        const fls = await mapFiles(images);
        const menuItem = await MenuItem.create({
            // userId,
            name,
            description,
            images: fls,
            price,
            soldout
        });
        res.json({ success: true, message: 'Menu created successfully', product: menuItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMenuItemById = async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.menuItemId);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(menuItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateMenuItem = async (req, res) => {
    try {
        const menuItem = await MenuItem.findByIdAndUpdate(req.params.menuItemId, req.body, { new: true });
        res.json(menuItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMenuItem = async (req, res) => {
    try {
        await MenuItem.findByIdAndDelete(req.params.menuItemId);
        res.json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createMenuItem,
    getMenuItems,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem,
};

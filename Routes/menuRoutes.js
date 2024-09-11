const express = require("express");
const menuItemController = require("../controllers/menuItemController");

const router = express.Router();

// Menu Item routes
router.post("/menuItems", menuItemController.createMenuItem);
router.get("/menuItems", menuItemController.getMenuItems);
router.get("/menuItems/:menuItemId", menuItemController.getMenuItemById);
router.put("/menuItems/:menuItemId", menuItemController.updateMenuItem);
router.delete("/menuItems/:menuItemId", menuItemController.deleteMenuItem);

module.exports = router;

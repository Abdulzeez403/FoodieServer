const cartSchema = require("../Models/cartModel");
const menuItemSchema = require("../Models/menuItemModel");

const addCart = async (req, res) => {
  try {
    const { userId, _id, quantity } = req.body;
    const menuItem = await menuItemSchema.findById(_id);
    if (!menuItem) {
      return res
        .status(404)
        .json({ success: false, message: "Menu item not found" });
    }

    const cartMenu = new cartSchema({
      userId,
      menu: menuItem,
      quantity,
    });

    const cart = await cartMenu.save();
    return res.json({
      success: true,
      message: "Add-to-cart created successfully",
      data: cart,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getUserCart = async (req, res) => {
  const userId = req.params.id;
  try {
    const cart = await cartSchema.find({ userId: userId }).exec();
    res.json({ success: true, message: "Get user carts", data: cart });
  } catch (errors) {
    res.json({ success: false, errors });
    console.log(errors);
  }
};

const updateCart = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const cart = await cartSchema.findByIdAndUpdate(id, body, { new: true });
    res.json({ success: true, message: "cart updated", data: cart });
  } catch (errors) {
    res.json({ success: false, errors });
    console.log(errors);
  }
};

const deleteCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await cartSchema.findByIdAndDelete(id);
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Cart Deleted", data: cart });
  } catch (error) {
    console.error("Error deleting cart:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getAllCart = async (req, res) => {
  try {
    const cart = await cartSchema.find();
    res.json({
      success: true,
      message: "Get All Cart successfully",
      data: cart,
    });
  } catch (errors) {
    res.json({ success: false, errors });
    console.log(errors);
  }
};
const emptyCart = async (req, res) => {
  const id = req.params.userId;
  const cart = await cartSchema.find({ userId: id });
  if (cart) {
    await cartSchema.deleteMany({ userld: id });
    const data = await cartSchema.find();
    res.json({
      success: true,
      message: "Cart is empty successfully!",
      data: data,
    });
  }
};

module.exports = {
  addCart,
  getUserCart,
  updateCart,
  deleteCart,
  getAllCart,
  emptyCart,
};

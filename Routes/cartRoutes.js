const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  addCart,
  getUserCart,
  deleteCart,
  updateCart,
  emptyCart,
  getAllCart,
} = require("../controllers/cartController");

//Get all carts
router.get("/cart", getAllCart);
router.post("/cart", addCart);
router.delete("/cart/delete/:id", emptyCart);
router.route("/cart/:id").get(getUserCart).put(updateCart).delete(deleteCart);

module.exports = router;

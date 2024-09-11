const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "foodieUser", required: true },
    menu: {
      type: {},
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("CartItem", cartSchema);

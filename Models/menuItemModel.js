
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const menuItemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [
        {
            uri: { type: String },
            name: { type: String },
            type: { type: String }
        },
    ],
    soldout: {
        type: String,
        default: false
    },
    price: {
        type: String,
        required: true
    },
    // You can add more menu item-related fields as needed
});
module.exports = mongoose.model("MenuItem", menuItemSchema)
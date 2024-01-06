const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'foodieUser', required: true },
    name: { type: String, required: true },
    cart: { type: {}, required: true },
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Delivered', 'Rejected'],
        default: 'Pending'
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model("Order", orderSchema);

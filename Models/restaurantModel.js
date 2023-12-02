const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    menu: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    // You can add more restaurant-related fields as needed
});
module.export = mongoose.model("Restaurant", restaurantSchema)

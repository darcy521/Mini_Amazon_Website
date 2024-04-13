const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        slug: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: String, required: true },
        status: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

const cartSchema = new mongoose.Schema(
    {
        userID: { type:String, required: true, unique:true },
        time: { type: Date, required: true },
        cartItems: [cartItemSchema]
    }
);

const Cart = mongoose.model('carts', cartSchema);
module.exports = Cart;
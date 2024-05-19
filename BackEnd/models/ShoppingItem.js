const mongoose = require("mongoose");

const shoppingItemSchema = new mongoose.Schema({
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShoppingItem",
    default: null,
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const ShoppingItem = mongoose.model("ShoppingItem", shoppingItemSchema);

module.exports = ShoppingItem;

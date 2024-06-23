const mongoose = require("mongoose");

const usedItemSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: [3, "First name must be at least 3 characters long"],
    required: [true, "First name is required"],
  },
  images: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
  },
  message: {
    type: String,
    minLength: [5, "Message must be at least 3 characters long"],
  },
  price: {
    type: Number,
    default: 0,
    min: [0, "price cannot be less than 0"],
  },
  email: {
    type: String,
    minLength: [3, "Email must be at least 3 characters long"],
    required: [true, "Email is required"],
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
    minLength: [3, "Address must be at least 3 characters long"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  itemType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ItemType",
    required: true,
  },
  dateOfOrder: {
    type: Date,
    default: Date.now,
  },
});

const UsedItem = mongoose.model("UsedItem", usedItemSchema);

module.exports = UsedItem;

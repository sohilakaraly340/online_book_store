const { required } = require("joi");
const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: {
    type: String,
    minLength: [3, "First name must be at least 3 characters long"],
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    minLength: [3, "Last name must be at least 3 characters long"],
  },
  email: {
    type: String,
    minLength: [3, "Email must be at least 3 characters long"],
    required: [true, "Email is required"],
    unique: true,
  },
  totalPrice: {
    type: Number,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
    minLength: [3, "Address must be at least 3 characters long"],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Canceled"],
    default: "Pending",
  },
  dateOfOrder: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  address: {
    type: String,
    minLength: [3, "Address must be at least 3 characters long"],
  },
  phoneNumber: {
    type: String,
  },
  wishList: {
    type: [mongoose.Schema.Types.ObjectId],
    ref:"Item",
    default: []
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

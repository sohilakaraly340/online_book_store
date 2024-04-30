const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minLength: [3, "First name must be at least 3 characters long"],
    maxLength: [512, "First name cannot exceed 512 characters"],
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    minLength: [3, "Last name must be at least 3 characters long"],
    maxLength: [512, "Last name cannot exceed 512 characters"],
  },
  email: {
    type: String,
    minLength: [3, "Email must be at least 3 characters long"],
    maxLength: [512, "Email cannot exceed 512 characters"],
    required: [true, "Email is required"],
    unique: true,
  },
  address: {
    type: String,
    minLength: [3, "Address must be at least 3 characters long"],
    maxLength: [512, "Address cannot exceed 512 characters"],
  },
  phoneNumber: {
    type: String,
  },
  // wishList: {
  //   type: [mongoose.Schema.Types.ObjectId],
  // },
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

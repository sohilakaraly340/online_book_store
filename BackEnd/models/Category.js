const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "category name is required"],
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

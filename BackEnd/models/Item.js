const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Item name is required"],
    minlength: [3, "Item name is too short"],
  },
  description: {
    type: String,
  },
  publicationDate: {
    // type: Date,
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
  price: {
    type: Number,
    default: 0,
    min: [0, "price cannot be less than 0"],
  },

  itemType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ItemType",
    required: true,
  },
  numOfPage: {
    type: Number,
    required: function () {
      return this.itemType === "Book";
    },
  },
  countInStock: {
    type: Number,
    required: true,
    min: [0, "count in stock cannot be less than 0"],
  },
  duration: {
    type: Number,
    default: 0,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, "Discount cannot be less than 0"],
    max: [100, "Discount cannot be greater than 100%"],
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  // rating: {
  //   type: Number,
  //   default: 0,
  // },
  // numReviews: {
  //   type: Number,
  //   default: 0,
  // },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;

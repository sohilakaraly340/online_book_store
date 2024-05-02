const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Item name is required"],
    maxlength: [100, "Item name is too long"],
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
    min: 0,
    max: 255,
  },
  duration: {
    type: Number,
    default: 0,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  //   authorId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Author",
  //   },
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

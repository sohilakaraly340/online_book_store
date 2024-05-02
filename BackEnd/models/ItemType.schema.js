const mongoose = require("mongoose");

const itemTypeSchema = new mongoose.Schema({
  itemType: { type: String, required: true },
});

const ItemType = mongoose.model("ItemType", itemTypeSchema);

module.exports = ItemType;

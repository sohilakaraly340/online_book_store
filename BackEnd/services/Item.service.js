const Item = require("../models/Item.schema");
const ItemType = require("../models/ItemType.schema");

const createItemService = async (body) => {
  try {
    return await Item.create(body);
  } catch (error) {
    console.log(error);
  }
};

const findItemType = async (id) => {
  return await ItemType.findOne({ _id: id });
};
const findItemService = async (id) => {
  return await Item.findOne({ _id: id }).populate("itemType");
};

const getAllItemsService = async () => {
  return await Item.find().populate("itemType");
};

module.exports = {
  createItemService,
  findItemService,
  getAllItemsService,
  findItemType,
};

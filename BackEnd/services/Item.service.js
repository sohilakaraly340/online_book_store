const Item = require("../models/Item.schema");
const ItemType = require("../models/ItemType.schema");

const createProductService = async (body) => {
  try {
    return await Item.create(body);
  } catch (error) {
    console.log(error);
  }
};

const findItemType = async (id) => {
  return await ItemType.findOne({ _id: id });
};
const findProductService = async (id) => {
  return await Item.findOne({ _id: id }).populate("itemType");
};

const getAllProductsService = async () => {
  return await Item.find().populate("itemType");
};

module.exports = {
  createProductService,
  findProductService,
  getAllProductsService,
  findItemType,
};

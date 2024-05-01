const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const {
  findItemService,
  getAllItemsService,
  findItemType,
  createItemService,
} = require("../services/Item.service");

const { validateAddProduct } = require("../validation/Item.validator");
const ItemType = require("../models/ItemType.schema");
const Item = require("../models/Item.schema");
const Category = require("../models/Category.schema");

const getAllItems = asyncHandler(async (req, res) => {
  try {
    const ItemList = await getAllItemsService();
    res
      .status(200)
      .json({ success: true, results: ItemList.length, data: ItemList });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

const getItemById = asyncHandler(async (req, res) => {
  try {
    let prdId = req.params.id;

    const Item = await findItemService(prdId);

    res.status(200).json({ success: true, data: Item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

const AddItemType = asyncHandler(async (req, res) => {
  try {
    let body = req.body;

    const productType = await ItemType.create(body);

    res.status(200).json({ success: true, data: productType });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

const addNewItem = asyncHandler(async (req, res) => {
  try {
    const { error } = validateAddProduct(req.body);
    if (error) {
      res.status(400).send({ message: error });
      return;
    }
    const itemType = await findItemType(req.body.itemType);
    if (!itemType) return res.status(400).send("invalid type");

    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send("invalid category");

    const newItem = await createItemService(req.body);
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

const deleteItem = asyncHandler(async (req, res) => {
  try {
    let prdId = req.params.id;

    const newItems = await Item.findOneAndDelete({ _id: prdId });

    res.status(201).json({ success: true, data: newItems });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

const updateItem = asyncHandler(async (req, res) => {
  try {
    let prdId = req.params.id;
    let body = req.body;

    const newItems = await Item.updateOne({ _id: prdId }, body);

    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send("invalid category");

    res.status(201).json({ success: true, data: newItems });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = {
  getAllItems,
  getItemById,
  deleteItem,
  addNewItem,
  AddItemType,
  updateItem,
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const {
  findItemType,
  createProductService,
} = require("../services/Item.service");
const { validateAddProduct } = require("../validation/Item.validator");
const ItemType = require("../models/ItemType.schema");

const AddItemType = asyncHandler(async (req, res) => {
  try {
    let body = validateAddProduct(req.body);

    const product = await ItemType.create(body);

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

const addNewProduct = asyncHandler(async (req, res) => {
  try {
    const { error } = req.body;
    if (error) {
      res.status(400).send({ message: error });
      return;
    }
    const itemType = await findItemType(req.body.itemType);
    if (!itemType) return res.status(400).send("invalid type");

    // const category = await categoryModule.findById(req.body.categories);
    // if (!category) return res.status(400).send("invalid category");

    const newProduct = await createProductService(req.body);
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = { addNewProduct, AddItemType };

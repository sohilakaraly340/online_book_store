const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const {
  createCategoryService,
  getAllCategoriesService,
} = require("../services/Category.service");
const Category = require("../models/Category.schema");
const Item = require("../models/Item.schema");

const AddCategory = asyncHandler(async (req, res) => {
  try {
    let body = req.body;

    const category = await createCategoryService(body);

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    let body = req.body;
    let id = req.params.id;

    const category = await Category.updateOne({ _id: id }, body);

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    let id = req.params.id;

    const category = await Category.findOneAndDelete({ _id: id });

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

const findAllcategories = asyncHandler(async (req, res) => {
  try {
    const categories = await getAllCategoriesService();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

const findItemsOfCategory = asyncHandler(async (req, res) => {
  try {
    let id = req.params.id;

    const category = await Item.find({ category: id });

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = {
  AddCategory,
  findAllcategories,
  updateCategory,
  deleteCategory,
  findItemsOfCategory,
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const {
  findProductService,
  getAllProductsService,
} = require("../services/Item.service");

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const productList = await getAllProductsService();
    res
      .status(200)
      .json({ success: true, results: productList.length, data: productList });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

const getProductById = asyncHandler(async (req, res) => {
  try {
    let prdId = req.params.id;

    const product = await findProductService(prdId);

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = {
  getAllProducts,
  getProductById,
};

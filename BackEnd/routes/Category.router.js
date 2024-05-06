const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/Category.controller");
const CategoryRepository = require("../repository/Category.repository");
const category = require("../models/Category.schema");
const item = require("../models/Item.schema");

const categoryRepository = new CategoryRepository(category, item);
const categoryController = new CategoryController(categoryRepository);

router.get("/", (req, res) => categoryController.findAllCategories(req, res));

router.get("/:id", (req, res) =>
  categoryController.findItemsOfCategory(req, res)
);

module.exports = router;

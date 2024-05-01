const express = require("express");
const {
  AddCategory,
  findAllcategories,
  updateCategory,
  deleteCategory,
  findItemsOfCategory,
} = require("../controllers/Category.controller");

const router = express.Router();

router.post("/", AddCategory);
router.get("/", findAllcategories);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.get("/:id", findItemsOfCategory);

module.exports = router;

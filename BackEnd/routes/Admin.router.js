const express = require("express");
const {
  addNewProduct,
  AddItemType,
} = require("../controllers/Admin.controller");
const router = express.Router();

router.post("/addItem", addNewProduct);
router.post("/addItemType", AddItemType);

module.exports = router;

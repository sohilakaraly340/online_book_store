const express = require("express");
const {
  addNewItem,
  AddItemType,
  deleteItem,
  updateItem,
} = require("../controllers/Item.controller");
const router = express.Router();

router.post("/addItem", addNewItem);
router.post("/addItemType", AddItemType);
router.delete("/deleteItem/:id", deleteItem);
router.patch("/updateItem/:id", updateItem);

module.exports = router;

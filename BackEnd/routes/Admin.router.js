const express = require("express");
const router = express.Router();

const ItemController = require("../controllers/Item.controller");
const ItemRepository = require("../repository/Item.repository");
const item = require("../models/Item.schema");
const itemType = require("../models/ItemType.schema");
const category = require("../models/Category.schema");

const itemRepository = new ItemRepository(item, itemType, category);
const itemController = new ItemController(itemRepository);

router.post("/addItem", (req, res) => itemController.AddItem(req, res));
router.post("/addItemType", (req, res) => itemController.AddItemType(req, res));

router.delete("/deleteItem/:id", (req, res) =>
  itemController.DeleteItem(req, res)
);
router.patch("/updateItem/:id", (req, res) =>
  itemController.UpdateItem(req, res)
);

module.exports = router;

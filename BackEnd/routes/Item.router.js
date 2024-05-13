const express = require("express");
const router = express.Router();

const ItemController = require("../controllers/Item.controller");
const ItemRepository = require("../repository/Item.repository");
const item = require("../models/Item.schema");
const itemType = require("../models/ItemType.schema");
const category = require("../models/Category.schema");
const author = require("../models/Author.schema");
const { validateItem } = require("../validation/Item.validator");

const itemRepository = new ItemRepository(item, itemType, category, author);
const itemController = new ItemController(itemRepository, validateItem);

router.get("/", (req, res) => itemController.GetAllItems(req, res));
router.get("/:id", (req, res) => itemController.GetItemById(req, res));
router.get("/search/:key", (req, res) => itemController.search(req, res));

module.exports = router;

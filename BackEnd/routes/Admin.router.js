const express = require("express");
const router = express.Router();

const ItemController = require("../controllers/Item.controller");
const ItemRepository = require("../repository/Item.repository");

const UserRepository = require("../repository/User.repository");
const UserController = require("../controllers/User.controller");

const CategoryController = require("../controllers/Category.controller");
const CategoryRepository = require("../repository/Category.repository");

const item = require("../models/Item.schema");
const itemType = require("../models/ItemType.schema");
const category = require("../models/Category.schema");
const user = require("../models/User.schema");

const itemRepository = new ItemRepository(item, itemType, category);
const itemController = new ItemController(itemRepository);

const userRepository = new UserRepository(user);
const userController = new UserController(userRepository);

const categoryRepository = new CategoryRepository(category, item);
const categoryController = new CategoryController(categoryRepository);

/////////////////////item//////////////////////////
router.post("/addItem", (req, res) => itemController.AddItem(req, res));
router.get("/allItems", (req, res) => itemController.GetAllItems(req, res));
router.delete("/deleteItem/:id", (req, res) =>
  itemController.DeleteItem(req, res)
);
router.patch("/updateItem/:id", (req, res) =>
  itemController.UpdateItem(req, res)
);
router.post("/addItemType", (req, res) => itemController.AddItemType(req, res));
router.delete("/deleteItemType", (req, res) =>
  itemController.DeleteItemType(req, res)
);
router.patch("/updateItemType", (req, res) =>
  itemController.UpdateItemType(req, res)
);

/////////////////////user/////////////////////////
router.get("/allUsers", (req, res) => userController.findAllUsers(req, res));

////////////////////category/////////////////////
router.get("/allCategories", (req, res) =>
  categoryController.findAllCategories(req, res)
);
router.patch("/updateCategory/:id", (req, res) =>
  categoryController.updateCategory(req, res)
);
router.post("/addCategory", (req, res) =>
  categoryController.addCategory(req, res)
);
router.delete("/deleteCategory/:id", (req, res) =>
  categoryController.deleteCategory(req, res)
);

module.exports = router;

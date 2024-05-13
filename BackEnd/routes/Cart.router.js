const express = require("express");
const router = express.Router();

const CartController = require("../controllers/Cart.controller");
const Cart = require("../models/Cart.schema");
const CartRepository = require("../repository/Cart.repository");

const Item = require("../models/Item.schema");
const ItemType = require("../models/ItemType.schema");
const Category = require("../models/Category.schema");
const ItemRepository = require("../repository/Item.repository");

const OrderItem = require("../models/OrderItem.schema");

const { orderItemValidation } = require("../validation/OrderItem.validator");

// console.log(orderItemValidation);
const cartRepository = new CartRepository(Cart);
const itemRepository = new ItemRepository(Item, ItemType, Category);

const cartController = new CartController(
  cartRepository,
  orderItemValidation,
  itemRepository,
  OrderItem,
  Cart
);

router.post("/addToCart", (req, res) =>
  cartController.addToCartController(req, res)
);

router.delete("/deleteCart/:id", (req, res) =>
  cartController.deleteCartController(req, res)
);

module.exports = router;

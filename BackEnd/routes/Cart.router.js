const express = require("express");
const CartController = require("../controllers/Cart.controller");
const CartRepository = require("../repository/Cart.repository");
const router = express.Router();
const cart = require("../models/Cart.schema");

const cartRepository = new CartRepository(cart);
const cartController = new CartController(cartRepository);

router.post("/addCart", (req, res) => {
  try {
    cartController.addCart(req, res);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deleteCart/:id", (req, res) => {
  try {
    cartController.deleteCartController(req, res);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

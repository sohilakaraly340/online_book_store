const { NotImplementedError } = require("../Errors/NotImplementedError");
const { NotFoundError } = require("../Errors/NotFoundError");
const Cart = require("../models/Cart");

class CartRepository {
  async getCurrentUserCart(id) {
    const cart = await Cart.findOne({ user: id });
    if (!cart) {
      throw new NotFoundError("Cart not found");
    }
    return cart;
  }

  async createCart(body) {
    return await Cart.create(body);
  }

  async deleteCartById(id) {
    const deletedCart = await Cart.findByIdAndDelete(id);
    if (!deletedCart) {
      throw new NotFoundError("ShoppingItem not found");
    }
    return deletedCart;
  }

  async getAllCarts() {
    const allCarts = await Cart.find();
    if (!allCarts) {
      throw new NotFoundError("Carts not found");
    }
    return allCarts;
  }
}

module.exports = CartRepository;

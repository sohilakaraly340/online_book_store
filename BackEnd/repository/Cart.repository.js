const { NotImplementedError } = require("../Errors/NotImplementedError");
const { NotFoundError } = require("../Errors/notFoundError");
const Cart = require("../models/Cart.schema");

class CartRepository {
  async getCurrentUserCartRepository(id) {
    const cart = await Cart.findOne({ user: id });
    if (!cart) {
      throw new NotFoundError("Cart not found");
    }
    return cart;
  }

  async createCartRepository(body) {
    return await Cart.create(body);
  }

  async deleteCartRepository(id) {
    const deletedCart = await Cart.findByIdAndDelete(id);
    if (!deletedCart) {
      throw new NotFoundError("ShoppingItem not found");
    }
    return deletedCart;
  }

  async getAllCartsRepository() {
    const allCarts = await Cart.find();
    if (!allCarts) {
      throw new NotFoundError("Carts not found");
    }
    return allCarts;
  }
}

module.exports = CartRepository;

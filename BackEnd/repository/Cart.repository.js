const Cart = require("../models/Cart.schema");

class CartRepository {
  async getCurrentUserCartRepository(id) {
    try {
      return await Cart.findOne({ user: id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createCartRepository(body) {
    try {
      return await Cart.create(body);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteCartRepository(id) {
    try {
      return await Cart.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllCartsRepository() {
    try {
      return await Cart.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = CartRepository;

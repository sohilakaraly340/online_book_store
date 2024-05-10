class CartRepository {
  constructor(cart) {
    this.cart = cart;
  }

  async getCurrentUserCartRepository(id) {
    try {
      return await this.cart.find({ user: id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createCartRepository(body) {
    try {
      return await this.cart.create(body);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteCartRepository(id) {
    try {
      return await this.cart.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllCartsRepository() {
    try {
      return await this.cart.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = CartRepository;

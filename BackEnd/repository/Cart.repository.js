class CartRepository {
  constructor(Cart, ShoppingItem) {
    this.Cart = Cart;
    this.ShoppingItem = ShoppingItem;
  }

  async getCurrentUserCartRepository(id) {
    try {
      return await this.Cart.findOne({ user: id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createCartRepository(body) {
    try {
      const cart = await this.Cart.create(body);
      return cart;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async deleteCartRepository(id) {
    console.log(id);
    try {
      return await this.Cart.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllCartsRepository() {
    try {
      return await this.Cart.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = CartRepository;

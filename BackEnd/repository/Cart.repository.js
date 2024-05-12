class CartRepository {
  constructor(Cart, OrderItem) {
    this.Cart = Cart;
    this.OrderItem = OrderItem;
  }

  async getCurrentUserCartRepository(id) {
    console.log(typeof id);
    try {
      return await this.Cart.findOne({ user: id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createCartRepository(body) {
    try {
      const cart = await this.Cart.create(body);
      console.log(cart);
      return cart;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async deleteCartRepository(id) {
    try {
      return await this.Cart.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllOrderItemsRepository() {
    try {
      return await this.OrderItem.find();
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

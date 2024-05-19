class CartController {
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  async getAllCarts() {
    return await this.cartRepository.getAllCarts();
  }

  async getCartByUserId(id) {
    return await this.cartRepository.getCurrentUserCart(id);
  }

  async deleteCartById(id) {
    return await this.cartRepository.deleteCartById(id);
  }
}

module.exports = CartController;

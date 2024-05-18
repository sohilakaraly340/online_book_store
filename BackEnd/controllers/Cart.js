class CartController {
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  async getAllCartsController() {
    return await this.cartRepository.getAllCartsRepository();
  }

  async getCartByUserIdController(id) {
    return await this.cartRepository.getCurrentUserCartRepository(id);
  }

  async deleteCartController(id) {
    return await this.cartRepository.deleteCartRepository(id);
  }
}

module.exports = CartController;

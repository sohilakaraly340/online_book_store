class CartController {
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  async getAllCartsController() {
    try {
      return await this.cartRepository.getAllCartsRepository();
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getCartByUserIdController(id) {
    try {
      return await this.cartRepository.getCurrentUserCartRepository(id);
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async deleteCartController(id) {
    try {
      const deletedCart = await this.cartRepository.deleteCartRepository(id);

      return { success: true, data: deletedCart };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

module.exports = CartController;

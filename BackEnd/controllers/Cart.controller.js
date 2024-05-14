class CartController {
  constructor(cartRepository, itemRepository, shoppingItemRepository) {
    this.cartRepository = cartRepository;
    this.itemRepository = itemRepository;
    this.shoppingItemRepository = shoppingItemRepository;
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

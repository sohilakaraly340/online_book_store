class CartController {
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  async addCartController(req, res) {
    try {
      const cart = await this.cartRepository.createCart(req.body);
      res.status(200).json({ success: true, data: cart });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deleteCartController(req, res) {
    try {
      const id = req.params.id;
      const deletedCart = await this.cartRepository.deleteCartRepository(id);
      res.status(200).json({ success: true, data: deletedCart });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = CartController;

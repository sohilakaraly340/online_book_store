class CartController {
  constructor(cartRepository, orderItemValidation, itemRepository, OrderItem) {
    this.cartRepository = cartRepository;
    this.orderItemValidation = orderItemValidation;
    this.itemRepository = itemRepository;
    this.OrderItem = OrderItem;
  }

  async addToCartController(req, res) {
    const { error, value } = this.orderItemValidation(req.body);

    if (error) {
      return res.status(422).send({ message: error.message });
    }
    console.log(value);

    let { item, quantity } = req.body;

    if (!quantity) {
      quantity = 1;
    }

    try {
      const userId = "663b6036de3d24007d26bb43";
      const Isitem = await this.itemRepository.findItem(item);

      if (!Isitem) res.status(404).json("Product not found");

      let cart = await this.cartRepository.getCurrentUserCartRepository(userId);

      if (!cart) {
        cart = await this.cartRepository.createCartRepository({ user: userId });
      }

      let orderItems = await this.cartRepository.getAllOrderItemsRepository();
      console.log(orderItems);

      const cartId = cart._id;

      const orderItem = new this.OrderItem({
        cartId: cartId,
        item: item,
        quantity: quantity,
      });

      await orderItem.save();

      return res.status(200).send(value);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error.message });
    }
  }

  async deleteCartController(req, res) {
    try {
      const id = req.params.id;
      const deletedCart = await this.cartRepository.deleteCartRepository(id);
      return res.status(200).json({ success: true, data: deletedCart });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  async checkStock(itemId, quantity) {
    const item = await this.itemRepository.findItem(itemId);

    if (+item.countInStock >= +quantity) {
      return false;
    }

    return true;
  }
}

module.exports = CartController;

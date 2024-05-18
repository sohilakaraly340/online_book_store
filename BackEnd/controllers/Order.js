const { NotImplementedError } = require("../Errors/NotImplementedError");
const { ValidationError } = require("../Errors/ValidationError");
const {
  orderValidation,
  orderUpdateValidation,
} = require("../validators/Order");

class OrderController {
  constructor(
    cartRepository,
    orderRepository,
    shoppingItemRepository,
    itemRepository
  ) {
    this.cartRepository = cartRepository;
    this.orderRepository = orderRepository;
    this.shoppingItemRepository = shoppingItemRepository;
    this.itemRepository = itemRepository;
  }

  async getAllorder() {
    return await this.orderRepository.getAllOrder();
  }

  async getOrderById(id) {
    const orderItems =
      await this.shoppingItemRepository.getShoppingItemsByOrderId(id);
    const order = await this.orderRepository.getOrderById(id);
    return { order: order, orderItems: orderItems };
  }

  async getCurrentUserOrders(auth) {
    const user = auth;
    return await this.orderRepository.getCurrentUserOrdersById(user._id);
  }

  async createNewOrder(auth, body) {
    const user = auth;

    const { error, value } = orderValidation(body);

    if (error) {
      throw new ValidationError(`InValid data ${error.message}`);
    }

    const { status, phoneNumber, address } = body;

    const cart = await this.cartRepository.getCurrentUserCart(user._id);

    let orderItems =
      await this.shoppingItemRepository.getCurrentCartAllshoppingItems(
        cart._id
      );

    if (orderItems.length == 0) {
      throw new NotImplementedError("Cart is empty!");
    }

    const totalPrice = this.calcTotalPrice(orderItems);

    const data = {
      user,
      totalPrice,
      status,
      phoneNumber,
      address,
    };

    const newOrder = await this.orderRepository.createNewOrder(data);

    const shoppingItemIds = orderItems.map((item) => item._id);

    await this.shoppingItemRepository.updateManyShoppingItems(
      shoppingItemIds,
      newOrder._id,
      null
    );

    return { order: newOrder, orderItems: orderItems };
  }

  async updateOrderById(id, body) {
    await this.orderRepository.getOrderById(id);

    const { error, value } = orderUpdateValidation(body);

    if (error) {
      throw new ValidationError(`InValid data ${error.message}`);
    }

    await this.orderRepository.updateOrder(id, body);

    return { message: "UpdatedSuccessfully" };
  }

  calcTotalPrice(orderItems) {
    let totalPrice = 0;

    for (const item of orderItems) {
      const itemPrice = item.item.discount
        ? item.item.price - (item.item.discount / 100) * item.item.price
        : item.item.price;
      totalPrice += itemPrice * item.quantity;
    }

    return totalPrice;
  }
}

module.exports = OrderController;

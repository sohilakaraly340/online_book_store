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

  async getAllorderController() {
    return await this.orderRepository.getAllOrderRepository();
  }

  async getOrderByIdController(id) {
    const orderItems =
      await this.shoppingItemRepository.getShoppingItemsByOrderId(id);
    const order = await this.orderRepository.getOrderByIdRepository(id);
    return { order: order, orderItems: orderItems };
  }

  async getCurrentUserOrdersController(auth) {
    const user = auth;
    return await this.orderRepository.getCurrentUserOrdersById(user._id);
  }

  async createNewOrderController(auth, body) {
    const user = auth;

    const { error, value } = orderValidation(body);

    if (error) {
      throw new ValidationError(`InValid data ${error.message}`);
    }

    const { status, phoneNumber, address } = body;

    const cart = await this.cartRepository.getCurrentUserCartRepository(
      user._id
    );

    let orderItems =
      await this.shoppingItemRepository.getAllCurrentCartshoppingItemsRepository(
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

    const newOrder = await this.orderRepository.createOrderRepository(data);

    const shoppingItemIds = orderItems.map((item) => item._id);

    await this.shoppingItemRepository.updateManyShoppingItemsRepository(
      shoppingItemIds,
      newOrder._id,
      null
    );

    return { order: newOrder, orderItems: orderItems };
  }

  async updateOrderController(id, body) {
    await this.orderRepository.getOrderByIdRepository(id);

    const { error, value } = orderUpdateValidation(body);

    if (error) {
      throw new ValidationError(`InValid data ${error.message}`);
    }

    await this.orderRepository.updateOrderRepository(id, body);

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

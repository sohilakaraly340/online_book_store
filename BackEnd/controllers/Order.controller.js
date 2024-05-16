const orderValidation = require("../validation/Order.validator");

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
    try {
      return await this.orderRepository.getAllOrderRepository();
    } catch (error) {
      return { message: error.message };
    }
  }

  async getOrderByIdController(id) {
    try {
      return await this.orderRepository.getOrderByIdRepository(id);
    } catch (error) {
      return { message: error.message };
    }
  }

  async getCurrentUserOrdersController() {
    const userId = "66444414aead5d1508746061";
    try {
      return await this.orderRepository.getCurrentUserOrdersById(userId);
    } catch (error) {
      return { message: error.message };
    }
  }

  async createNewOrderController(body) {
    try {
      const user = "66444414aead5d1508746061";
      const { error, value } = orderValidation(body);
      const { status, phoneNumber, address } = body;

      if (error) {
        return { message: error.message };
      }

      const cart = await this.cartRepository.getCurrentUserCartRepository(user);
      console.log(cart._id);
      let orderItems =
        await this.shoppingItemRepository.getAllCurrentCartshoppingItemsRepository(
          cart._id
        );
      if (orderItems.length == 0) return { message: "cart is empty" };

      const totalPrice = this.calcTotalPrice(orderItems);

      const data = {
        user,
        totalPrice,
        status,
        phoneNumber,
        address,
      };

      const newOrder = await this.orderRepository.createOrderRepository(data);

      //   console.log("orderitems", orderItems);

      const shoppingItemIds = orderItems.map((item) => item._id);

      const result =
        await this.shoppingItemRepository.updateManyShoppingItemsRepository(
          shoppingItemIds,
          newOrder._id,
          null
        );
      console.log(result);

      return newOrder;
    } catch (error) {
      return { message: error.message };
    }
  }

  async updateOrderController(id, body) {
    try {
      const order = await this.orderRepository.getOrderByIdRepository(id);
      if (!order) {
        return { message: "Order not found" };
      }
      const updatedOrder = await this.orderRepository.updateOrderRepository(
        id,
        body
      );
      return { message: "UpdatedSuccessfully" };
    } catch (error) {
      return { message: error.message };
    }
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

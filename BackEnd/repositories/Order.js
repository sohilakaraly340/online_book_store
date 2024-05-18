const { NotFoundError } = require("../Errors/NotFoundError");
const Order = require("../models/Order");

class OrderRepository {
  async getAllOrderRepository() {
    const allOrders = await Order.find();
    if (!allOrders) {
      throw new NotFoundError("Orders not found");
    }
    return allOrders;
  }

  async getOrderByIdRepository(id) {
    const order = await Order.findOne({ _id: id });
    if (!order) {
      throw new NotFoundError("Orders not found");
    }
    return order;
  }

  async getCurrentUserOrdersById(id) {
    const orders = await Order.find({ user: id });
    if (!orders) {
      throw new NotFoundError("Orders not found");
    }
    return orders;
  }

  async createOrderRepository(body) {
    return await Order.create(body);
  }

  async updateOrderRepository(id, body) {
    const updatedData = await Order.updateOne({ _id: id }, body);
    if (updatedData.modifiedCount == 0) {
      throw new NotFoundError("Order not found");
    }
    return updatedData;
  }
}

module.exports = OrderRepository;

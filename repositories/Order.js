const { NotFoundError } = require("../Errors/NotFoundError");
const Order = require("../models/Order");

class OrderRepository {
  async getAllOrder() {
    const allOrders = await Order.find();
    if (!allOrders) {
      throw new NotFoundError("Orders not found");
    }
    return allOrders;
  }

  async getOrderById(id) {
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

  async createNewOrder(body) {
    return await Order.create(body);
  }

  async updateOrder(id, body) {
    const updatedData = await Order.updateOne({ _id: id }, body);
    if (updatedData.modifiedCount == 0) {
      throw new NotFoundError("Order not found");
    }
    return updatedData;
  }
}

module.exports = OrderRepository;

const Order = require("../models/Order.schema");

class OrderRepository {
  async getAllOrderRepository() {
    try {
      return await Order.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getOrderByIdRepository(id) {
    try {
      return await Order.findOne({ _id: id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCurrentUserOrdersById(id) {
    try {
      return await Order.find({ user: id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createOrderRepository(body) {
    try {
      return await Order.create(body);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateOrderRepository(id, body) {
    try {
      return await Order.updateOne({ _id: id }, body);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = OrderRepository;

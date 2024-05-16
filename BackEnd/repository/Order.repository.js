class OrderRepository {
  constructor(Order) {
    this.Order = Order;
  }

  async getAllOrderRepository() {
    try {
      return await this.Order.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getOrderByIdRepository(id) {
    try {
      return await this.Order.findOne({ _id: id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCurrentUserOrdersById(id) {
    try {
      return await this.Order.find({ user: id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createOrderRepository(body) {
    try {
      return await this.Order.create(body);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateOrderRepository(id, body) {
    try {
      return await this.Order.updateOne({ _id: id }, body);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = OrderRepository;

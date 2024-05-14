class ShoppingItemRepository {
  constructor(ShoppingItem) {
    this.ShoppingItem = ShoppingItem;
  }

  async getAllshoppingItemsRepository() {
    try {
      return await this.ShoppingItem.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllCurrentCartshoppingItemsRepository(id) {
    try {
      return await this.ShoppingItem.find({ cartId: id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createShoppingItemRepository(body) {
    try {
      return await this.ShoppingItem.create(body);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findShoppingItemByIdRepository(id) {
    try {
      return await this.ShoppingItem.findOne({ _id: id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateShoppingItemRepository(item, body) {
    console.log(item, body);
    try {
      return await this.ShoppingItem.updateOne({ _id: item }, body);
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async deleteShoppingItemRepository(id) {
    try {
      return await this.ShoppingItem.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = ShoppingItemRepository;

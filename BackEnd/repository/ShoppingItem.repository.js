const ShoppingItem = require("../models/ShoppingItem.schema");

class ShoppingItemRepository {
  async getAllshoppingItemsRepository() {
    try {
      return await ShoppingItem.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllCurrentCartshoppingItemsRepository(id) {
    try {
      return await ShoppingItem.find({ cartId: id }).populate("item");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createShoppingItemRepository(body) {
    try {
      return await ShoppingItem.create(body);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findShoppingItemByIdRepository(id) {
    try {
      return await ShoppingItem.findOne({ _id: id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateShoppingItemRepository(itemId, body) {
    console.log(itemId);
    console.log(body);
    try {
      return await ShoppingItem.findOneAndUpdate({ _id: itemId }, body);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateManyShoppingItemsRepository(
    shoppingItemIds,
    newOrderId,
    newCartId
  ) {
    try {
      return await ShoppingItem.updateMany(
        { _id: { $in: shoppingItemIds } },
        { $set: { orderId: newOrderId, cartId: newCartId } }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteShoppingItemRepository(id, user) {
    try {
      return await ShoppingItem.findByIdAndDelete({ _id: id, user });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async clearAllShoppingItem(cartId) {
    try {
      const data = await ShoppingItem.deleteMany({ cartId: cartId });
      console.log(data);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = ShoppingItemRepository;

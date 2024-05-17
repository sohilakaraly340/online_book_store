const { BadRequestError } = require("../Errors/badRequestError");
const { NotFoundError } = require("../Errors/notFoundError");
const ShoppingItem = require("../models/ShoppingItem.schema");

class ShoppingItemRepository {
  async getAllshoppingItemsRepository() {
    const allshoppingItems = await ShoppingItem.find();
    if (!allshoppingItems) {
      throw new NotFoundError("No Founded Data");
    }
    return allshoppingItems;
  }

  async getAllCurrentCartshoppingItemsRepository(id) {
    const shoppingItems = await ShoppingItem.find({ cartId: id }).populate(
      "item"
    );
    if (!shoppingItems) {
      throw new NotFoundError("ShoppingItems not found");
    }
    return shoppingItems;
  }

  async getShoppingItemsByOrderId(id) {
    const shoppingItem = await ShoppingItem.find({ orderId: id }).populate(
      "item"
    );
    if (!shoppingItem) {
      throw new NotFoundError("ShoppingItem not found");
    }
    return shoppingItem;
  }

  async createShoppingItemRepository(body) {
    const item = await ShoppingItem.create(body);
    if (!item) {
      throw new Error("Something went wrong");
    }
    return item;
  }

  async findShoppingItemByIdRepository(id) {
    const shoppingItem = await ShoppingItem.findOne({ _id: id });
    if (!shoppingItem) {
      throw new NotFoundError("ShoppingItem not found");
    }
    return shoppingItem;
  }

  async updateShoppingItemRepository(itemId, body) {
    const updatedData = await ShoppingItem.findOneAndUpdate(
      { _id: itemId },
      body
    );
    if (!updatedData) {
      throw new NotFoundError("ShoppingItem not found");
    }
    return updatedData;
  }

  async updateManyShoppingItemsRepository(
    shoppingItemIds,
    newOrderId,
    newCartId
  ) {
    const updatedData = await ShoppingItem.updateMany(
      { _id: { $in: shoppingItemIds } },
      { $set: { orderId: newOrderId, cartId: newCartId } }
    );
    if (!updatedData) {
      throw new NotFoundError("ShoppingItem not found");
    }
    return updatedData;
  }

  async deleteShoppingItemRepository(id, user) {
    const deletedItem = await ShoppingItem.findByIdAndDelete({ _id: id, user });
    if (!deletedItem) {
      throw new NotFoundError("ShoppingItem not found");
    }
    return deletedItem;
  }

  async clearAllShoppingItem(cartId) {
    const deletedItems = await ShoppingItem.deleteMany({ cartId: cartId });
    if (deletedItems.modifiedCount == 0)
      throw new NotFoundError("ShoppingItems not found");
    return deletedItems;
  }
}

module.exports = ShoppingItemRepository;

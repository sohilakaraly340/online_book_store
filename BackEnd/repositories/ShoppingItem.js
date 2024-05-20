const { NotFoundError } = require("../Errors/NotFoundError");
const ShoppingItem = require("../models/ShoppingItem");

class ShoppingItemRepository {
  async getAllshoppingItems() {
    const allshoppingItems = await ShoppingItem.find();
    if (!allshoppingItems) {
      throw new NotFoundError("No Founded Data");
    }
    return allshoppingItems;
  }

  async getCurrentCartAllshoppingItems(id) {
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

  async createShoppingItem(body) {
    const item = await ShoppingItem.create(body).populate("item");
    if (!item) {
      throw new Error("Something went wrong");
    }
    return item;
  }

  async findShoppingItemById(id) {
    const shoppingItem = await ShoppingItem.findOne({ _id: id });
    if (!shoppingItem) {
      throw new NotFoundError("ShoppingItem not found");
    }
    return shoppingItem;
  }

  async updateShoppingItem(itemId, body) {
    const updatedData = await ShoppingItem.findOneAndUpdate(
      { _id: itemId },
      body
    );
    if (!updatedData) {
      throw new NotFoundError("ShoppingItem not found");
    }
    return updatedData;
  }

  async updateManyShoppingItems(shoppingItemIds, newOrderId, newCartId) {
    const updatedData = await ShoppingItem.updateMany(
      { _id: { $in: shoppingItemIds } },
      { $set: { orderId: newOrderId, cartId: newCartId } }
    );
    if (!updatedData) {
      throw new NotFoundError("ShoppingItem not found");
    }
    return updatedData;
  }

  async deleteShoppingItemById(id, user) {
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

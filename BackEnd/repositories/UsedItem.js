const { NotFoundError } = require("../Errors/NotFoundError");
const { deleteImages } = require("../middlewares/firebase");
const UsedItem = require("../models/UsedItem");

class UsedItemRepository {
  async getAllUsedItems() {
    const usedItems = await UsedItem.find()
      .populate("itemType")
      .populate("category")
      .populate("user");
    if (!usedItems) {
      throw new NotFoundError("No Items Found");
    }
    return usedItems;
  }

  async createNewUsedItem(body) {
    return await UsedItem.create(body);
  }

  async deleteUsedItemById(id) {
    const usedItem = await UsedItem.findById(id);
    if (!usedItem) throw new NotFoundError("UsedItem not found");

    await deleteImages(usedItem.images);
    const deletedUsedItem = await UsedItem.findByIdAndDelete(id);
    return deletedUsedItem;
  }

  async findUsedItemById(id) {
    const usedItem = await UsedItem.findOne({ _id: id })
      .populate("user")
      .populate("category")
      .populate("itemType");
    if (!usedItem) new NotFoundError("UsedItem not found");
    return usedItem;
  }

  async findUsedItemByCategory(id) {
    const usedItem = await UsedItem.find({ category: id })
      .populate("user")
      .populate("category")
      .populate("itemType");
    if (!usedItem) new NotFoundError("UsedItem not found");
    return usedItem;
  }

  async updateUsedItem(id, body) {
    const usedItem = await UsedItem.findOne({ _id: id });
    if (!usedItem) throw new NotFoundError("UsedItem not found");

    const updatedUsedItem = await UsedItem.findOneAndUpdate(
      { _id: id },
      body,
      { new: true } // Return the updated document
    )
      .populate("user")
      .populate("category")
      .populate("itemType");

    if (!updatedUsedItem) {
      throw new NotFoundError("UsedItem not found");
    }

    return updatedUsedItem;
  }

  async getCurrentUserUsedItemsById(id) {
    const usedItems = await UsedItem.find({ user: id })
      .populate("user")
      .populate("category")
      .populate("itemType");

    if (!usedItems) throw new NotFoundError("UsedItems not found");

    return usedItems;
  }
}

module.exports = UsedItemRepository;

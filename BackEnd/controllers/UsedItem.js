const { ValidationError } = require("../Errors/ValidationError");
const {
  usedItemValidation,
  updateValidateUsedItem,
} = require("../validators/UsedItem");

class UsedItemController {
  constructor(UsedItemRepository) {
    this.usedItemRepository = UsedItemRepository;
  }

  async getAllUsedItems() {
    return await this.usedItemRepository.getAllUsedItems();
  }

  async getUsedItemById(id) {
    const usedItem = await this.usedItemRepository.findUsedItemById(id);
    let suggestionUsedItems =
      await this.usedItemRepository.findUsedItemByCategory(
        usedItem.category._id
      );
    suggestionUsedItems = suggestionUsedItems.filter(
      (item) => item._id.toString() !== usedItem._id.toString()
    );
    return { usedItem: usedItem, suggestionUsedItems: suggestionUsedItems };
  }

  async getCurrentUsedUsedItems(auth) {
    const user = auth;
    const usedItems = await this.usedItemRepository.getCurrentUserUsedItemsById(
      user._id
    );

    return usedItems;
  }

  async createNewUsedItem(auth, body) {
    const user = auth;
    const { error } = usedItemValidation(body);
    if (error) {
      throw new ValidationError(`Invalid data ${error.message}`);
    }
    const data = { ...body, user: user._id };
    return await this.usedItemRepository.createNewUsedItem(data);
  }

  async updateUsedItemById(id, body) {
    const { error } = updateValidateUsedItem(body);
    if (error) {
      throw new ValidationError(`Invalid data ${error.message}`);
    }
    await this.usedItemRepository.updateUsedItem(id, body);
    return { message: "UpdatedSuccessfully" };
  }

  async deleteUsedItem(id) {
    return await this.usedItemRepository.deleteUsedItemById(id);
  }
}

module.exports = UsedItemController;

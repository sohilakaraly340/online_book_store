const { ValidationError } = require("../Errors/validationError");
const {
  usedItemValidation,
  updateValidateUsedItem,
} = require("../validators/UsedItem");

class UsedItemController {
  constructor(UsedItemRepository) {
    this.usedItemRepository = UsedItemRepository;
  }

  async getAllUsedItems() {
    let allUsedItems = await this.usedItemRepository.getAllUsedItems();
    allUsedItems = allUsedItems.reverse();
    return allUsedItems;
  }

  async getUsedItemById(id) {
    const usedItem = await this.usedItemRepository.findUsedItemById(id);
    let suggestionUsedItems;
    console.log(usedItem.category);
    if (usedItem.category) {
      suggestionUsedItems =
        await this.usedItemRepository.findUsedItemByCategory(
          usedItem.category._id
        );
    } else {
      suggestionUsedItems = await this.usedItemRepository.getAllUsedItems();
      suggestionUsedItems = suggestionUsedItems.slice(0, 5);
    }
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

  async updateUsedItemById(auth, id, body) {
    const user = auth;
    const { error } = updateValidateUsedItem(body);
    if (error) {
      throw new ValidationError(`Invalid data ${error.message}`);
    }
    const data = { ...body, user: user._id };
    const response = await this.usedItemRepository.updateUsedItem(id, data);
    console.log(response);
    return response;
  }

  async deleteUsedItem(id) {
    return await this.usedItemRepository.deleteUsedItemById(id);
  }
}

module.exports = UsedItemController;

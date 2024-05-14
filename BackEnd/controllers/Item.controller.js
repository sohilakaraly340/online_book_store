const { BadRequestError } = require("../handleErrors/badRequestError");
const { InternalServerError } = require("../handleErrors/internalServerError");
const validator = require("../validation/Item.validator");
class ItemController {
  constructor(itemRepository) {
    this.itemRepository = itemRepository;
  }

  handleError = (error) => {
    if (error instanceof BadRequestError)
      throw new BadRequestError(error.message);

    throw new InternalServerError(error.message);
  };

  async AddItem(body, itemType, category) {
    try {
      const { error } = validator.validateItem(body);
      if (error) {
        throw new BadRequestError(`In valid data ${error.message}`);
      }

      const ItemType = await this.itemRepository.findItemType(itemType);

      const Category = await this.itemRepository.findCategory(category);

      return await this.itemRepository.createItem(body);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getItemTypes() {
    return await this.itemRepository.getItemTypes();
  }

  async AddItemType(body) {
    return await this.itemRepository.createItemType(body);
  }

  async DeleteItemType(id) {
    return await this.itemRepository.deleteItemType(id);
  }

  async UpdateItemType(id, body) {
    return await this.itemRepository.updateItemType(id, body);
  }

  async DeleteItem(id) {
    return await this.itemRepository.deleteItem(id);
  }

  async GetItemById(id) {
    return await this.itemRepository.findItem(id);
  }

  async UpdateItem(id, body, category) {
    if (category) {
      const Category = await this.itemRepository.findCategory(category);
    }

    return await this.itemRepository.updateItem(id, body);
  }

  async GetAllItems() {
    return await this.itemRepository.getAllItems();
  }

  async search(key) {
    return await this.itemRepository.search(key);
  }
}

module.exports = ItemController;

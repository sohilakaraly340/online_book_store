const { ValidationError } = require("../Errors/validationError");
const validator = require("../validation/Item.validator");
class ItemController {
  constructor(itemRepository) {
    this.itemRepository = itemRepository;
  }

  async AddItem(body, itemType, category) {
    const { error } = validator.validateItem(body);
    if (error) {
      throw new ValidationError(`In valid data ${error.message}`);
    }

    await this.itemRepository.findItemType(body.itemType);
    await this.itemRepository.findCategory(body.category);

    return await this.itemRepository.createItem(body);
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

  async UpdateItem(id, body) {
    if (body.category) {
      await this.itemRepository.findCategory(category);
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

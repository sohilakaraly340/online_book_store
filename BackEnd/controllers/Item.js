const { ValidationError } = require("../Errors/ValidationError");
const validator = require("../validators/Item");
class ItemController {
  constructor(itemRepository) {
    this.itemRepository = itemRepository;
  }

  async createNewItem(body, itemType, category) {
    const { error } = validator.validateItem(body);
    if (error) {
      throw new ValidationError(`In valid data ${error.message}`);
    }

    await this.itemRepository.findItemTypeById(body.itemType);
    await this.itemRepository.findCategoryById(body.category);

    return await this.itemRepository.createNewItem(body);
  }

  async getAllItemTypes() {
    return await this.itemRepository.getAllItemTypes();
  }

  async createNewItemType(body) {
    return await this.itemRepository.createNewItemType(body);
  }

  async deleteItemTypeById(id) {
    return await this.itemRepository.deleteItemTypeById(id);
  }

  async updateItemType(id, body) {
    return await this.itemRepository.updateItemType(id, body);
  }

  async deleteItemById(id) {
    return await this.itemRepository.deleteItemById(id);
  }

  async getItemById(id) {
    return await this.itemRepository.findItemById(id);
  }

  async updateItem(id, body) {
    // if (body.category) {
    //   const category =await this.itemRepository.findCategoryById(category);
    // }

    return await this.itemRepository.updateItem(id, body);
  }

  async getAllItems() {
    return await this.itemRepository.getAllItems();
  }

  async search(key) {
    return await this.itemRepository.search(key);
  }

  async newArrival() {
    const items = await this.itemRepository.getAllItems();

    return items.slice(-4).reverse();
  }

  async selectOptions() {
    const options = await this.itemRepository.selectOptions();

    return options;
  }
}

module.exports = ItemController;

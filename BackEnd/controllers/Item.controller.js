const validator = require("../validation/Item.validator");
class ItemController {
  constructor(itemRepository) {
    this.itemRepository = itemRepository;
  }

  async AddItem(body, itemType, category) {
    try {
      const { error } = validator.validateItem(body);
      if (error) {
        return { success: false, message: error.message };
      }
      const ItemType = await this.itemRepository.findItemType(itemType);
      if (!ItemType) throw new Error("invalid type");

      const Category = await this.itemRepository.findCategory(category);
      if (!Category) throw new Error("invalid category");

      return await this.itemRepository.createItem(body);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getItemTypes() {
    try {
      return await this.itemRepository.getItemTypes();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async AddItemType(body) {
    try {
      return await this.itemRepository.createItemType(body);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async DeleteItemType(id) {
    try {
      return await this.itemRepository.deleteItemType(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async UpdateItemType(id, body) {
    try {
      return await this.itemRepository.updateItemType(id, body);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async DeleteItem(id) {
    try {
      return await this.itemRepository.deleteItem(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async GetItemById(id) {
    try {
      return await this.itemRepository.findItem(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async UpdateItem(id, body, category) {
    try {
      if (category) {
        const Category = await this.itemRepository.findCategory(category);
        if (!Category) throw new Error("invalid category");
      }

      return await this.itemRepository.updateItem(id, body);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async GetAllItems() {
    try {
      return await this.itemRepository.getAllItems();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async search(key) {
    try {
      return await this.itemRepository.search(key);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = ItemController;

class ItemController {
  constructor(itemRepository, validateItem) {
    this.itemRepository = itemRepository;
    this.validateItem = validateItem;
  }

  async AddItem(req, res) {
    try {
      const { error } = this.validateItem(req.body);
      if (error) {
        res.status(400).json({ success: false, message: error.message });
        return;
      }
      const itemType = await this.itemRepository.findItemType(
        req.body.itemType
      );
      if (!itemType) return res.status(400).send("invalid type");

      const category = await this.itemRepository.findCategory(
        req.body.category
      );
      if (!category) return res.status(400).send("invalid category");

      const newItem = await this.itemRepository.createItem(req.body);

      res.status(200).json({ success: true, data: newItem });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, message: error.message });
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

  async UpdateItemType(id,body) {
    try {
      return await this.itemRepository.updateItemType(id,body);
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

  async UpdateItem(req, res) {
    try {
      if (req.body.category) {
        const category = await this.itemRepository.findCategory(
          req.body.category
        );
        if (!category) return res.status(400).send("invalid category");
      }

      const updatedItem = await this.itemRepository.updateItem(
        req.params.id,
        req.body
      );

      res.status(201).json({ success: true, data: updatedItem });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
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

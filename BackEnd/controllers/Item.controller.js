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

  async getItemTypes(req, res) {
    try {
      const itemType = await this.itemRepository.getItemTypes();
      res.status(200).json({ success: true, data: itemType });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async AddItemType(req, res) {
    try {
      const itemType = await this.itemRepository.createItemType(req.body);
      res.status(200).json({ success: true, data: itemType });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async DeleteItemType(req, res) {
    try {
      const newItemsType = await this.itemRepository.deleteItemType(
        req.params.id
      );
      res.status(200).json({ success: true, data: newItemsType });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async UpdateItemType(req, res) {
    try {
      const updatedItemType = await this.itemRepository.updateItemType(
        req.params.id,
        req.body
      );

      res.status(201).json({ success: true, data: updatedItemType });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async DeleteItem(req, res) {
    try {
      const newItems = await this.itemRepository.deleteItem(req.params.id);
      res.status(200).json({ success: true, data: newItems });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async GetItemById(req, res) {
    try {
      const Item = await this.itemRepository.findItem(req.params.id);

      res.status(200).json({ success: true, data: Item });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
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

  async GetAllItems(req, res) {
    try {
      const ItemList = await this.itemRepository.getAllItems();
      res
        .status(200)
        .json({ success: true, results: ItemList.length, data: ItemList });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async search(req, res) {
    try {
      const data = await this.itemRepository.search(req.params.key);

      res.status(200).json({ success: true, data: data });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = ItemController;

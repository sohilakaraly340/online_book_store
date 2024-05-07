class ItemRepository {
  constructor(item, itemType, category) {
    this.item = item;
    this.itemType = itemType;
    this.category = category;
  }
  async createItemType(body) {
    try {
      return await this.itemType.create(body);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteItemType(id) {
    try {
      return await this.itemType.findByIdAndDelete({ _id: id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateItemType(id, body) {
    return await this.itemType.updateOne({ _id: id }, body);
  }

  async createItem(body) {
    try {
      return await this.item.create(body);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async search(key) {
    try {
      const data = await this.item.aggregate([
        {
          $match: {
            $or: [
              { title: { $regex: key, $options: "i" } },
              { category: { $regex: key, $options: "i" } },
            ],
          },
        },
      ]);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteItem(id) {
    try {
      return await this.item.findByIdAndDelete({ _id: id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findItemType(id) {
    return await this.itemType.findOne({ _id: id });
  }
  async findItem(id) {
    return await this.item.findOne({ _id: id }).populate("itemType");
  }

  async findCategory(id) {
    return await this.category.findOne({ _id: id });
  }

  async getAllItems() {
    return await this.item.find().populate("itemType");
  }

  async updateItem(id, body) {
    return await this.item.updateOne({ _id: id }, body);
  }
}

module.exports = ItemRepository;

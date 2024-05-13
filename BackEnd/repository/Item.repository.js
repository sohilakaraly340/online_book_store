class ItemRepository {
  constructor(item, itemType, category, author) {
    this.item = item;
    this.itemType = itemType;
    this.category = category;
    this.author = author;
  }

  async getItemTypes() {
    try {
      return await this.itemType.find();
    } catch (error) {
      throw new Error(error.message);
    }
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
      const categories = await this.category.find({
        title: { $regex: key, $options: "i" },
      });
      const authors = await this.author.find({
        title: { $regex: key, $options: "i" },
      });

      const categoryIds = categories.map((category) => category._id);
      const authorIds = authors.map((author) => author._id);

      const data = await this.item
        .find({
          $or: [
            { title: { $regex: key, $options: "i" } },
            { category: { $in: categoryIds } },
            { author: { $in: authorIds } },
          ],
        })
        .populate("category");

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
    return await this.item.find().populate("itemType").populate("category");
  }

  async updateItem(id, body) {
    return await this.item.updateOne({ _id: id }, body);
  }
}

module.exports = ItemRepository;

const { InternalServerError } = require("../Errors/internalServerError");
const { NotFoundError } = require("../Errors/notFoundError");

class ItemRepository {
  constructor(item, itemType, category, author) {
    this.item = item;
    this.itemType = itemType;
    this.category = category;
    this.author = author;
  }

  async getItemTypes() {
    const itmeTypes = await this.itemType.find();
    if (!itmeTypes) {
      throw new NotFoundError("No types found ");
    }
    return itmeTypes;
  }

  async createItemType(body) {
    return await this.itemType.create(body);
  }

  async deleteItemType(id) {
    const deletedItemType = await this.itemType.findByIdAndDelete(id);

    if (!deletedItemType) throw new NotFoundError("Item type not found");

    return deletedItemType;
  }

  async createItem(body) {
    return await this.item.create(body);
  }

  async search(key) {
    const categories = await this.category.find({
      title: { $regex: key, $options: "i" },
    });
    const authors = await this.author.find({
      name: { $regex: key, $options: "i" },
    });

    const categoryIds = categories.map((category) => category._id);
    const authorIds = authors.map((author) => author._id);

    const data = await this.item
      .find({
        $or: [
          { title: { $regex: key, $options: "i" } },
          { category: { $in: categoryIds } },
          { authorId: { $in: authorIds } },
        ],
      })
      .populate("category")
      .populate("authorId");

    if (!data)
      throw new NotFoundError("No items found matching the search criteria.");

    return data;
  }

  async deleteItem(id) {
    const deletedItem = await this.item.findByIdAndDelete(id);

    if (!deletedItem) throw new NotFoundError("Item not found");

    return deletedItem;
  }

  async findItemType(id) {
    const itemType = await this.itemType.findOne({ _id: id });

    if (!itemType) throw new NotFoundError("Item type not found");

    return itemType;
  }

  async findItem(id) {
    const item = await this.item.findOne({ _id: id }).populate("itemType");

    if (!item) {
      throw new NotFoundError("Item not found");
    }

    return item;
  }

  async findCategory(id) {
    const category = await this.category.findOne({ _id: id });

    if (!category) throw new NotFoundError("Category not found");

    return category;
  }

  async getAllItems() {
    const items = await this.item
      .find()
      .populate("itemType")
      .populate("category");

    if (!items) throw new NotFoundError("Items not found");

    return items;
  }

  async updateItem(id, body) {
    const updatedItem = await this.item.updateOne({ _id: id }, body);

    if (updatedItem.modifiedCount == 0)
      throw new NotFoundError("Item not found");

    return updatedItem;
  }
  async updateItemType(id, body) {
    const updatedItemType = await this.itemType.updateOne({ _id: id }, body);

    if (updatedItemType.modifiedCount == 0)
      throw new NotFoundError("Item not found");

    return updatedItemType;
  }
}

module.exports = ItemRepository;

const { NotFoundError } = require("../Errors/NotFoundError");
const { deleteImages } = require("../middlewares/firebase");
const Author = require("../models/Author");
const Category = require("../models/Category");
const Item = require("../models/Item");
const ItemType = require("../models/ItemType");

class ItemRepository {
  async getAllItemTypes() {
    const itmeTypes = await ItemType.find();
    if (!itmeTypes) {
      throw new NotFoundError("No types found ");
    }
    return itmeTypes;
  }

  async createNewItemType(body) {
    return await ItemType.create(body);
  }

  async deleteItemTypeById(id) {
    const deletedItemType = await ItemType.findByIdAndDelete(id);

    if (!deletedItemType) throw new NotFoundError("Item type not found");

    return deletedItemType;
  }

  async createNewItem(body) {
    return await Item.create(body);
  }

  async search(key) {
    const categories = await Category.find({
      title: { $regex: key, $options: "i" },
    });
    const authors = await Author.find({
      name: { $regex: key, $options: "i" },
    });

    const categoryIds = categories.map((category) => category._id);
    const authorIds = authors.map((author) => author._id);

    const data = await Item.find({
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

  async deleteItemById(id) {
    const item = await Item.findById(id);
    if (!item) throw new NotFoundError("Item not found");

    await deleteImages(item.images);
    const deletedItem = await Item.findByIdAndDelete(id);

    return deletedItem;
  }

  async findItemTypeById(id) {
    const itemType = await ItemType.findOne({ _id: id });

    if (!itemType) throw new NotFoundError("Item type not found");

    return itemType;
  }

  async findItemById(id) {
    const item = await Item.findOne({ _id: id }).populate("itemType");

    if (!item) {
      throw new NotFoundError("Item not found");
    }

    return item;
  }

  async findCategoryById(id) {
    const category = await Category.findOne({ _id: id });

    if (!category) throw new NotFoundError("Category not found");

    return category;
  }

  async getAllItems() {
    const items = await Item.find().populate("itemType").populate("category");

    if (!items) throw new NotFoundError("Items not found");

    return items;
  }

  async updateItem(id, body) {
    const item = await Item.findById(id);
    if (!item) throw new NotFoundError("Item not found");
    if (body.images) {
      deleteImages(item.images);
    }
    const updatedItem = await Item.updateOne({ _id: id }, body);

    return updatedItem;
  }
  async updateItemType(id, body) {
    const updatedItemType = await ItemType.updateOne({ _id: id }, body);

    if (updatedItemType.modifiedCount == 0)
      throw new NotFoundError("Item not found");

    return updatedItemType;
  }
}

module.exports = ItemRepository;

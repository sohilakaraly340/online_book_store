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
    const authors = await Author.find({
      name: { $regex: key, $options: "i" },
    });

    let itemsByAuthor = [];

    if (authors.length > 0) {
      const authorIds = authors.map((author) => author._id);
      itemsByAuthor = await Item.find({
        authorId: { $in: authorIds },
      })
        .populate("itemType")
        .populate("category")
        .populate("authorId");
    }

    const itemsByTitle = await Item.find({
      title: { $regex: key, $options: "i" },
    })
      .populate("itemType")
      .populate("category")
      .populate("authorId");

    if (itemsByAuthor.length === 0 && itemsByTitle.length === 0) {
      throw new NotFoundError("No items found matching the search criteria.");
    }

    return {
      itemsByAuthor,
      itemsByTitle,
    };
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
    const item = await Item.findOne({ _id: id })
      .populate("itemType")
      .populate("category")
      .populate("authorId");
    if (!item) {
      throw new NotFoundError("Item not found");
    }

    let suggestionItems = await Item.find({ category: item.category._id });
    suggestionItems = suggestionItems.slice(1, suggestionItems.length);

    return { item, suggestionItems };
  }

  async findCategoryById(id) {
    const category = await Category.findOne({ _id: id });

    if (!category) throw new NotFoundError("Category not found");

    return category;
  }

  async getAllItems() {
    const items = await Item.find()
      .populate("itemType")
      .populate("category")
      .populate("authorId");

    if (!items) throw new NotFoundError("Items not found");

    return items;
  }

  async updateItem(id, body) {
    const item = await Item.findById(id);
    if (!item) throw new NotFoundError("Item not found");

    const itemType = await ItemType.findById(body.itemType);
    console.log(itemType);
    if (!itemType) throw new NotFoundError("item type not found");

    const author = await Author.findById(body.authorId);
    if (!author) throw new NotFoundError("item type not found");

    const category = await Category.findById(body.category);
    if (!category) throw new NotFoundError("category not found");

    if (body.images) {
      deleteImages(item.images);
    }
    const updatedItem = await Item.updateOne({ _id: id }, body);

    return updatedItem;
  }

  async updateItemStock(id, body) {
    const item = await Item.findById(id);
    if (!item) throw new NotFoundError("Item not found");

    const updatedData = await Item.updateOne({ _id: id }, body);

    return updatedData;
  }

  async updateItemType(id, body) {
    const updatedItemType = await ItemType.updateOne({ _id: id }, body);

    if (updatedItemType.modifiedCount == 0)
      throw new NotFoundError("Item not found");

    return updatedItemType;
  }

  async selectOptions() {
    const categoryOpitions = await Category.find({}, "title");
    const authorOpitions = await Author.find({}, "name");
    const itemTypeOpitions = await ItemType.find({}, "itemType");
    return {
      categoryOpitions,
      authorOpitions,
      itemTypeOpitions,
    };
  }
}

module.exports = ItemRepository;

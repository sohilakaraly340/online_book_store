const { InternalServerError } = require("../Errors/internalServerError");
const { NotFoundError } = require("../Errors/notFoundError");

class ItemRepository {
  constructor(item, itemType, category, author) {
    this.item = item;
    this.itemType = itemType;
    this.category = category;
    this.author = author;
  }

  handleError = (error) => {
    if (error instanceof NotFoundError) throw new NotFoundError(error.message);

    throw new InternalServerError(error.message);
  };

  async getItemTypes() {
    try {
      const itmeTypes = await this.itemType.find();
      if (!itmeTypes) {
        throw new NotFoundError("No types found ");
      }
      return itmeTypes;
    } catch (error) {
      this.handleError(error);
    }
  }

  async createItemType(body) {
    try {
      return await this.itemType.create(body);
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteItemType(id) {
    try {
      const deletedItemType = await this.itemType.findByIdAndDelete(id);

      if (!deletedItemType) {
        throw new NotFoundError("Item type not found");
      }

      return deletedItemType;
    } catch (error) {
      this.handleError(error);
    }
  }

  async createItem(body) {
    try {
      return await this.item.create(body);
    } catch (error) {
      this.handleError(error);
    }
  }

  async search(key) {
    try {
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

      if (!data) {
        throw new NotFoundError("No items found matching the search criteria.");
      }

      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteItem(id) {
    try {
      const deletedItem = await this.item.findByIdAndDelete(id);

      if (!deletedItem) {
        throw new NotFoundError("Item not found");
      }

      return deletedItem;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findItemType(id) {
    try {
      const itemType = await this.itemType.findOne({ _id: id });

      if (!itemType) {
        throw new NotFoundError("Item type not found");
      }

      return itemType;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findItem(id) {
    try {
      const item = await this.item.findOne({ _id: id }).populate("itemType");

      if (!item) {
        throw new NotFoundError("Item not found");
      }

      return item;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findCategory(id) {
    try {
      const category = await this.category.findOne({ _id: id });

      if (!category) {
        throw new NotFoundError("Category not found");
      }

      return category;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllItems() {
    try {
      const items = await this.item
        .find()
        .populate("itemType")
        .populate("category");

      if (!items) throw new NotFoundError("Items not found");

      return items;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateItem(id, body) {
    try {
      const updatedItem = await this.item.updateOne({ _id: id }, body);

      if (updatedItem.modifiedCount == 0) {
        throw new NotFoundError("Item not found");
      }

      return updatedItem;
    } catch (error) {
      this.handleError(error);
    }
  }
  async updateItemType(id, body) {
    try {
      const updatedItemType = await this.itemType.updateOne({ _id: id }, body);

      if (updatedItemType.modifiedCount == 0) {
        throw new NotFoundError("Item not found");
      }

      return updatedItemType;
    } catch (error) {
      this.handleError(error);
    }
  }
}

module.exports = ItemRepository;

const { InternalServerError } = require("../handleErrors/internalServerError");
const { NotFoundError } = require("../handleErrors/notFoundError");

class CategoryRepository {
  constructor(category, item) {
    this.category = category;
    this.item = item;
  }

  handleError = (error) => {
    if (error instanceof NotFoundError) throw new NotFoundError(error.message);

    throw new InternalServerError(error.message);
  };

  async createCategory(body) {
    try {
      return await this.category.create(body);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  async updateCategory(id, body) {
    try {
      const updatedCategory = await this.category.findByIdAndUpdate(id, body, {
        new: true,
      });

      if (updatedCategory.modifiedCount == 0) {
        throw new NotFoundError("Category not found");
      }
      return updatedCategory;
    } catch (error) {
      this.handleError(error);
    }
  }
  async deleteCategory(id) {
    try {
      const deletedCategory = await this.category.findByIdAndDelete(id);

      if (!deletedCategory) {
        throw new NotFoundError("Category not found");
      }

      return deletedCategory;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllCategories() {
    try {
      const categories = await this.category.find();

      if (!categories) {
        throw new NotFoundError("No categories found");
      }

      return categories;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findItemsOfCategory(id) {
    try {
      const items = await this.item
        .find({ category: id })
        .populate("itemType")
        .populate("category");

      if (!items) {
        throw new NotFoundError("No items found for this category");
      }

      return items;
    } catch (error) {
      this.handleError(error);
    }
  }
}

module.exports = CategoryRepository;

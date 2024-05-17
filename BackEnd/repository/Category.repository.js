const { InternalServerError } = require("../Errors/internalServerError");
const { NotFoundError } = require("../Errors/notFoundError");

class CategoryRepository {
  constructor(category, item) {
    this.category = category;
    this.item = item;
  }

  async createCategory(body) {
    return await this.category.create(body);
  }

  async updateCategory(id, body) {
    const updatedCategory = await this.category.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (updatedCategory.modifiedCount == 0)
      throw new NotFoundError("Category not found");

    return updatedCategory;
  }
  async deleteCategory(id) {
    const deletedCategory = await this.category.findByIdAndDelete(id);

    if (!deletedCategory) {
      throw new NotFoundError("Category not found");
    }

    return deletedCategory;
  }

  async getAllCategories() {
    const categories = await this.category.find();

    if (!categories) throw new NotFoundError("No categories found");

    return categories;
  }

  async findItemsOfCategory(id) {
    const items = await this.item
      .find({ category: id })
      .populate("itemType")
      .populate("category");

    if (!items) throw new NotFoundError("No items found for this category");

    return items;
  }
}

module.exports = CategoryRepository;

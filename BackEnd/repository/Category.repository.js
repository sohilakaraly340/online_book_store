const { NotFoundError } = require("../Errors/notFoundError");
const Category = require("../models/Category.schema");
const Item = require("../models/Item.schema");

class CategoryRepository {
  async createCategory(body) {
    return await Category.create(body);
  }

  async updateCategory(id, body) {
    const category = await Category.findById(id);
    if (!category) throw new NotFoundError("Category not found");
    const updatedCategory = await Category.findByIdAndUpdate(id, body, {
      new: true,
    });

    return updatedCategory;
  }

  async deleteCategory(id) {
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      throw new NotFoundError("Category not found");
    }

    return deletedCategory;
  }

  async getAllCategories() {
    const categories = await Category.find();

    if (!categories) throw new NotFoundError("No categories found");

    return categories;
  }

  async findItemsOfCategory(id) {
    const items = await Item.find({ category: id })
      .populate("itemType")
      .populate("category");

    if (!items) throw new NotFoundError("No items found for this category");

    return items;
  }
}

module.exports = CategoryRepository;

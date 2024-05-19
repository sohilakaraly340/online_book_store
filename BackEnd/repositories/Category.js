const { NotFoundError } = require("../Errors/NotFoundError");
const { deleteImages } = require("../middlewares/firebase");
const Category = require("../models/Category");
const Item = require("../models/Item");

class CategoryRepository {
  async createCategory(body) {
    return await Category.create(body);
  }

  async updateCategory(id, body) {
    const category = await Category.findById(id);
    if (!category) throw new NotFoundError("Category not found");

    if (body.images) {
      await deleteImages(category.images);
    }
    const updatedCategory = await Category.findByIdAndUpdate(id, body, {
      new: true,
    });

    return updatedCategory;
  }

  async deleteCategoryById(id) {
    const category = await Category.findById(id);

    if (!category) {
      throw new NotFoundError("Category not found");
    }
    await deleteImages(category.images);

    const deletedCategory = await Category.findByIdAndDelete(id);
    return deletedCategory;
  }

  async getAllCategories() {
    const categories = await Category.find();

    if (!categories) throw new NotFoundError("No categories found");

    return categories;
  }

  async getAllItemsOfCategory(id) {
    const items = await Item.find({ category: id })
      .populate("itemType")
      .populate("category");

    if (!items) throw new NotFoundError("No items found for this category");

    return items;
  }
}

module.exports = CategoryRepository;

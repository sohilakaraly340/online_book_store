const { InternalServerError } = require("../Errors/internalServerError");
const { NotFoundError } = require("../Errors/notFoundError");
const Category = require("../models/Category.schema");
const Item = require("../models/Item.schema");

class CategoryRepository {
  handleError = (error) => {
    if (error instanceof NotFoundError) throw new NotFoundError(error.message);

    throw new InternalServerError(error.message);
  };

  async createCategory(body) {
    try {
      return await Category.create(body);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  async updateCategory(id, body) {
   
      const updatedCategory = await Category.findByIdAndUpdate(id, body, {
        new: true,
      });

    if (updatedCategory.modifiedCount == 0)
      throw new NotFoundError("Category not found");

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

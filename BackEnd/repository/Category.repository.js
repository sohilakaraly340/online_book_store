class CategoryRepository {
  constructor(category, item) {
    this.category = category;
    this.item = item;
  }
  async createCategory(body) {
    try {
      return await this.category.create(body);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateCategory(id, body) {
    try {
      return await this.category.findByIdAndUpdate(id, body, { new: true });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteCategory(id) {
    try {
      return await this.category.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllCategories() {
    try {
      return await this.category.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findItemsOfCategory(id) {
    try {
      return await this.item
        .find({ category: id })
        .populate("itemType")
        .populate("category");
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = CategoryRepository;

class CategoryController {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async addCategory(body) {
    try {
      return await this.categoryRepository.createCategory(body);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAllCategories() {
    try {
      return await this.categoryRepository.getAllCategories();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateCategory(id, body) {
    try {
      return await this.categoryRepository.updateCategory(id, body);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteCategory(id) {
    try {
      return await this.categoryRepository.deleteCategory(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findItemsOfCategory(id) {
    try {
      return await this.categoryRepository.findItemsOfCategory(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = CategoryController;

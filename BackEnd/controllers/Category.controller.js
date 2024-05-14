class CategoryController {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async addCategory(body) {
    return await this.categoryRepository.createCategory(body);
  }

  async findAllCategories() {
    return await this.categoryRepository.getAllCategories();
  }

  async updateCategory(id, body) {
    return await this.categoryRepository.updateCategory(id, body);
  }

  async deleteCategory(id) {
    return await this.categoryRepository.deleteCategory(id);
  }

  async findItemsOfCategory(id) {
    return await this.categoryRepository.findItemsOfCategory(id);
  }
}

module.exports = CategoryController;

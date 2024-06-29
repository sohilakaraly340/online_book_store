const { ValidationError } = require("../Errors/validationError");
const validator = require("../validators/Category");
class CategoryController {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async createCategory(body) {
    const { error } = validator.validateCategory(body);
    if (error) {
      throw new ValidationError(`In valid data ${error.message}`);
    }
    return await this.categoryRepository.createCategory(body);
  }

  async getAllCategories() {
    return await this.categoryRepository.getAllCategories();
  }

  async updateCategory(id, body) {
    return await this.categoryRepository.updateCategory(id, body);
  }

  async deleteCategory(id) {
    return await this.categoryRepository.deleteCategoryById(id);
  }

  async getAllItemsOfCategory(id) {
    return await this.categoryRepository.getAllItemsOfCategory(id);
  }
}

module.exports = CategoryController;

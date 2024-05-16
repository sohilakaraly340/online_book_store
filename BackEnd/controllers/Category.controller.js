const { ValidationError } = require("../Errors/validationError");
const validator = require("../validation/Category");
class CategoryController {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async addCategory(body) {
    const { error } = validator.validateCategory(body);
    if (error) {
      throw new ValidationError(`In valid data ${error.message}`);
    }
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

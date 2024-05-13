class CategoryController {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async addCategory(req, res) {
    try {
      const category = await this.categoryRepository.createCategory(req.body);
      res.status(200).json({ success: true, data: category });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async findAllCategories() {
    try {
    return await this.categoryRepository.getAllCategories();
      
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateCategory(req, res) {
    try {
      const id = req.params.id;
      const updatedCategory = await this.categoryRepository.updateCategory(
        id,
        req.body
      );
      res.status(200).json({ success: true, data: updatedCategory });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deleteCategory(req, res) {
    try {
      const id = req.params.id;
      const deletedCategory = await this.categoryRepository.deleteCategory(id);
      res.status(200).json({ success: true, data: deletedCategory });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
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

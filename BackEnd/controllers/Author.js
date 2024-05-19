const { ValidationError } = require("../Errors/ValidationError");
const validator = require("../validators/Author");

class AuthorController {
  constructor(authorRepository) {
    this.authorRepository = authorRepository;
  }

  async createAuthor(body) {
    const { error } = validator.validateAuthor(body);
    if (error) {
      throw new ValidationError(`In valid data ${error.message}`);
    }

    return await this.authorRepository.createNewAuthor(body);
  }

  async getAllAuthors() {
    return await this.authorRepository.getAllAuthors();
  }

  async getBooksOfAuthor(id) {
    return await this.authorRepository.getAllBooks(id);
  }
  async getAuthorById(id) {
    return await this.authorRepository.getAuthorById(id);
  }

  async updateAuthor(id, body) {
    return await this.authorRepository.updateAuthor(id, body);
  }

  async deleteAuthorById(id) {
    return await this.authorRepository.deleteAuthorById(id);
  }
}
module.exports = AuthorController;

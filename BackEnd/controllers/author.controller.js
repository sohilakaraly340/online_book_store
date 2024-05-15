class AuthorController {
  constructor(authorRepo) {
    this.authorRepo = authorRepo;
  }

  async createAuthor(body) {
    return await this.authorRepo.createNewAuthor(body);
  }

  async getAllAuthor() {
    return await this.authorRepo.getAll();
  }

  async getBooksOfAuthor(id) {
    return await this.authorRepo.getAllBooks(id);
  }
}
module.exports = AuthorController;

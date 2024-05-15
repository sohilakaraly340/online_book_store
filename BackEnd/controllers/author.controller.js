class AuthorController {
  constructor(authorRepo) {
    this.authorRepo = authorRepo;
  }

  async createAuthor(body) {
    // try {
    return await this.authorRepo.createNewAuthor(body);
    // } catch (error) {
    //   throw new Error(error.message);
    // }
  }

  async getAllAuthor() {
    // try {
    return await this.authorRepo.getAll();
    // } catch (error) {
    //   throw new Error(error.message);
    // }
  }

  async getBooksOfAuthor(id) {
    // try {
    return await this.authorRepo.getAllBooks(id);
    // } catch (error) {
    //   throw new Error(error.message);
    // }
  }
}
module.exports = AuthorController;

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
  async getAuthorById(id){
    return await this.authorRepo.getAuthorById(id);
  }

  async updateAuthor(id,body){
    return await this.authorRepo.updateAuthor(id,body);
  }

  async deleteAuthor(id){
    return await this.authorRepo.deleteAuthor(id)
  }
}
module.exports = AuthorController;

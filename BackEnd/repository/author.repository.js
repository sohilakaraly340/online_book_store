const { InternalServerError } = require("../Errors/internalServerError");
const { NotFoundError } = require("../Errors/notFoundError");

class AuthorRepository {
  constructor(author, item) {
    this.author = author;
    this.item = item;
  }

  async createNewAuthor(body) {
    const newAuthor = await this.author.create(body);
    return newAuthor;
  }

  async getAll() {
    const authors = await this.author.find();
    if (!authors) throw new NotFoundError("Not found authors!");

    return authors;
  }
  async getAuthorById(id) {
    const author = await this.author.findOne({ _id: id });
    if (!author) throw new NotFoundError("Author not found!");
    return author;
  }

  async getAllBooks(authorId) {
    const author = await this.author.findOne({ _id: authorId });
    if (!author) throw new NotFoundError("Author not found!");

    const books = await this.item.find({ authorId });
    if (!books) throw new NotFoundError("Not found books for this authors!");
    return books;
  }

  async updateAuthor(id, body) {
    const updated = await this.author.updateOne({ _id: id }, body);
    if (!updated) throw new NotFoundError("Author not Found!");
    return updated;
  }

  async deleteAuthor(id) {
    const deleted = await this.author.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundError("Author not Found!");
    return deleted;
  }
}
module.exports = AuthorRepository;

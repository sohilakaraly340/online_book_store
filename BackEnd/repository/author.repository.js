const { InternalServerError } = require("../handleErrors/internalServerError");
const { NotFoundError } = require("../handleErrors/notFoundError");

class AuthorRepository {
  constructor(author, item) {
    this.author = author;
    this.item = item;
  }

  async createNewAuthor(body) {
    try {
      const newAuthor = await this.author.create(body);
      return newAuthor;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  async getAll() {
    try {
      const authors = await this.author.find();
      if (authors.length === 0) {
        throw new NotFoundError("Not found authors!");
      }
      return authors;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundError(error.message);
      } else {
        throw new InternalServerError(error.message);
      }
    }
  }

  async getAllBooks(authorId) {
    try {
      const books = await this.item.find({ authorId });
      if (books.length === 0)
        return NotFoundError("Not found books for this authors!");
      return books;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundError(error.message);
      } else {
        throw new InternalServerError(error.message);
      }
    }
  }
}
module.exports = AuthorRepository;

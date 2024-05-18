const { NotFoundError } = require("../Errors/NotFoundError");
const { deleteImages } = require("../middlewares/firebase");
const Author = require("../models/Author");
const Item = require("../models/Item");

class AuthorRepository {
  async createNewAuthor(body) {
    const newAuthor = await Author.create(body);
    return newAuthor;
  }

  async getAll() {
    const authors = await Author.find();
    if (!authors) throw new NotFoundError("Not found authors!");

    return authors;
  }
  async getAuthorById(id) {
    const author = await Author.findOne({ _id: id });
    if (!author) throw new NotFoundError("Author not found!");
    return author;
  }

  async getAllBooks(authorId) {
    const author = await Author.findOne({ _id: authorId });
    if (!author) throw new NotFoundError("Author not found!");

    const books = await Item.find({ authorId });
    if (!books) throw new NotFoundError("Not found books for this authors!");
    return books;
  }

  async updateAuthor(id, body) {
    const author = await Author.findById(id);
    if (!author) throw new NotFoundError("Author not Found!");
    if (body.images) {
      await deleteImages(author.images);
    }

    const updated = await Author.updateOne({ _id: id }, body);

    return updated;
  }

  async deleteAuthor(id) {
    const author = await Author.findById(id);
    if (!author) throw new NotFoundError("Author not Found!");
    await deleteImages(author.images);
    const deleted = await Author.findByIdAndDelete(id);
    return deleted;
  }
}
module.exports = AuthorRepository;
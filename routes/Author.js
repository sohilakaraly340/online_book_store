const express = require("express");
const { handleAsync } = require("../Errors/HandleAsync");
const paginate = require("../middlewares/Pagination");
const router = express.Router();
const author = require("../models/Author");
const authorRouter = (authorController) => {
  router.get(
    "/",
    paginate(author),
    handleAsync(async (req, res) => {
      const authors = await authorController.getAllAuthors();

      res.status(200).json({ success: true, data: req.paginatedResult });
    })
  );

  router.get(
    "/items/:id",
    handleAsync(async (req, res) => {
      const allBooks = await authorController.getBooksOfAuthor(req.params.id);
      res.status(200).json({ success: true, data: allBooks });
    })
  );

  router.get(
    "/mostPopularAuthor",
    handleAsync(async (req, res) => {
      const mostPopularAuthor = await authorController.getAuthorWithMostBooks();
      res.status(200).json({ success: true, data: mostPopularAuthor });
    })
  );
  return router;
};

module.exports = authorRouter;

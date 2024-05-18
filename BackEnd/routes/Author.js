const express = require("express");
const { handleAsync } = require("../Errors/HandleAsync");
const router = express.Router();

const authorRouter = (authorController) => {
  router.get(
    "/",
    handleAsync(async (req, res) => {
      const authors = await authorController.getAllAuthors();

      res.status(200).json({ success: true, data: authors });
    })
  );

  router.get(
    "/items/:id",
    handleAsync(async (req, res) => {
      const allBooks = await authorController.getBooksOfAuthor(req.params.id);
      res.status(200).json({ success: true, data: allBooks });
    })
  );

  return router;
};

module.exports = authorRouter;

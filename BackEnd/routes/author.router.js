const express = require("express");

const router = express.Router();

const authorRouter = (authorController) => {
  router.get("/", async (req, res) => {
    try {
      const authors = await authorController.getAllAuthor();
      res.status(200).json({ success: true, data: authors });
    } catch (error) {
      console.log(error);
      res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const newAuthor = await authorController.createAuthor(req.body);
      res.status(200).json({ success: true, data: newAuthor });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message });
    }
  });

  router.get("/books/:id", async (req, res) => {
    try {
      const allBooks = await authorController.getBooksOfAuthor(req.params.id);
      res.status(200).json({ success: true, data: allBooks });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message });
    }
  });

  return router;
};

module.exports = authorRouter;

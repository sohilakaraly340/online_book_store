const express = require("express");
const { handleAsync } = require("../../Errors/handleAsync");
const router = express.Router();

const authorRouter = (authorController) => {
  router.patch(
    "/:id",
    handleAsync(async (req, res) => {
      const updated = await authorController.updateAuthor(
        req.params.id,
        req.body
      );

      res.status(200).json({ success: true, data: updated });
    })
  );
  router.delete(
    "/:id",
    handleAsync(async (req, res) => {
      const deleted = await authorController.deleteAuthor(req.params.id);
      res
        .status(200)
        .json({ success: true, data: "author deleted successfully" });
    })
  );

  router.post(
    "/",
    handleAsync(async (req, res) => {
      const newAuthor = await authorController.createAuthor(req.body);
      res.status(201).json({ success: true, data: newAuthor });
    })
  );

  router.get(
    "/",
    handleAsync(async (req, res) => {
      const authors = await authorController.getAllAuthor();

      res.status(200).json({ success: true, data: authors });
    })
  );

  return router;
};

module.exports = authorRouter;

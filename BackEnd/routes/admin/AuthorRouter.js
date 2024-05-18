const express = require("express");
const { handleAsync } = require("../../Errors/handleAsync");
const { admin } = require("../../middleware/admin");
const { uploadImage } = require("../../middleware/firebase");
const { uploadSingle } = require("../../middleware/multer");
const router = express.Router();

const authorRouter = (authorController) => {
  router.post(
    "/",
    uploadSingle,
    uploadImage,
    handleAsync(async (req, res) => {
      const newAuthor = await authorController.createAuthor(req.body);
      res.status(201).json({ success: true, data: newAuthor });
    })
  );

  router.patch(
    "/:id",
    uploadSingle,
    uploadImage,
    admin,
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
    admin,
    handleAsync(async (req, res) => {
      await authorController.deleteAuthor(req.params.id);
      res
        .status(200)
        .json({ success: true, data: "author deleted successfully" });
    })
  );

  return router;
};

module.exports = authorRouter;

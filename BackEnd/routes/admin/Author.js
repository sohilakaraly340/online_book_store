const express = require("express");
const { handleAsync } = require("../../Errors/HandleAsync");
const { admin } = require("../../middlewares/Admin");
const router = express.Router();
const upload = require("../../middlewares/Multer");

const authorRouter = (authorController) => {
  router.post(
    "/",
    upload.single("image"),
    admin,
    handleAsync(async (req, res) => {
      const body = { ...req.body, image: req.file ? req.file.filename : null };
      const newAuthor = await authorController.createAuthor(body);
      res.status(201).json({ success: true, data: newAuthor });
    })
  );

  router.patch(
    "/:id",
    upload.single("image"),
    admin,
    handleAsync(async (req, res) => {
      const body = { ...req.body, image: req.file ? req.file.filename : null };
      const updated = await authorController.updateAuthor(req.params.id, body);

      res.status(200).json({ success: true, data: updated });
    })
  );
  router.delete(
    "/:id",
    admin,
    handleAsync(async (req, res) => {
      const deleted = await authorController.deleteAuthor(req.params.id);
      res
        .status(200)
        .json({ success: true, data: "author deleted successfully" });
    })
  );

  return router;
};

module.exports = authorRouter;

const express = require("express");
const { handleAsync } = require("../../Errors/handleAsync");
const { admin } = require("../../middleware/admin");
const upload = require("../../middleware/multer");

const router = express.Router();

const categoryRouter = (categoryController) => {
  router.post(
    "/",
    upload.single("image"),
    admin,
    handleAsync(async (req, res) => {
      const body = { ...req.body, image: req.file ? req.file.filename : null };
      const newCategory = await categoryController.addCategory(body);
      res.status(201).json({ success: true, data: newCategory });
    })
  );

  router.patch(
    "/:id",
    upload.single("image"),
    admin,
    handleAsync(async (req, res) => {
      const body = { ...req.body, image: req.file ? req.file.filename : null };
      const updatedCategory = await categoryController.updateCategory(
        req.params.id,
        body
      );
      res.status(200).json({ success: true, data: updatedCategory });
    })
  );

  router.delete(
    "/:id",
    admin,
    handleAsync(async (req, res) => {
      await categoryController.deleteCategory(req.params.id);
      res
        .status(200)
        .json({ success: true, message: "Category deleted successfully" });
    })
  );

  return router;
};

module.exports = categoryRouter;

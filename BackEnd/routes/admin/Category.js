const express = require("express");
const { handleAsync } = require("../../Errors/HandleAsync");
const { admin } = require("../../middlewares/Admin");
const { uploadSingle } = require("../../middlewares/Multer");
const { uploadImage } = require("../../middlewares/firebase");
// const upload = require("../../middleware/multer");

const router = express.Router();

const categoryRouter = (categoryController) => {
  router.post(
    "/",
    uploadSingle,
    uploadImage,
    admin,
    handleAsync(async (req, res) => {
      const newCategory = await categoryController.createCategory(req.body);
      res.status(201).json({ success: true, data: newCategory });
    })
  );

  router.get(
    "/",
    handleAsync(async (req, res) => {
      const allCategory = await categoryController.getAllCategories();
      res.status(200).json({ success: true, data: allCategory });
    })
  );

  router.patch(
    "/:id",
    uploadSingle,
    uploadImage,
    admin,
    handleAsync(async (req, res) => {
      const updatedCategory = await categoryController.updateCategory(
        req.params.id,
        req.body
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

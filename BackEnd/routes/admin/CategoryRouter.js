const express = require("express");
const router = express.Router();

const categoryRouter = (categoryController) => {
  router.get("/", async (req, res) => {
    try {
      const allCategory = await categoryController.findAllCategories();
      res.status(200).json({ success: true, data: allCategory });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message });
    }
  });
  router.post("/", async (req, res) => {
    try {
      const newCategory = await categoryController.addCategory(req.body);
      res.status(201).json({ success: true, data: newCategory });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message });
    }
  });
  router.patch("/:id", async (req, res) => {
    try {
      const newCategory = await categoryController.updateCategory(
        req.params.id,
        req.body
      );
      res.status(200).json({ success: true, data: newCategory });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message });
    }
  });
  router.delete("/:id", async (req, res) => {
    try {
      const deleted = await categoryController.deleteCategory(req.params.id);
      res
        .status(200)
        .json({ success: true, data: "category deleted successfully" });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message });
    }
  });

  return router;
};

// router.delete("/:id", (req, res) =>
//   categoryController.deleteCategory(req, res)
// );

module.exports = categoryRouter;

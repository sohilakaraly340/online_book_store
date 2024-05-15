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

  router.get("/:id", async (req, res) => {
    try {
      const itemOfCategory = await categoryController.findItemsOfCategory(
        req.params.id
      );

      res.status(200).json({ success: true, data: itemOfCategory });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message });
    }
  });
  return router;
};

module.exports = categoryRouter;

const express = require("express");
const router = express.Router();

const categoryRouter = (categoryController) => {
  router.get("/", async (req, res) => {
    try {
      const allCategory = await categoryController.findAllCategories();
      res.status(200).json({ success: true, data: allCategory });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const itemOfCategory = await categoryController.findItemsOfCategory(
        req.params.id
      );
      if (itemOfCategory.length == 0)
        res.json("this category hasn't have any item");
      else {
        res.status(200).json({ success: true, data: itemOfCategory });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
  return router;
};

module.exports = categoryRouter;

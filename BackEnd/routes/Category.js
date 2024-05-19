const express = require("express");
const { handleAsync } = require("../Errors/HandleAsync");
const router = express.Router();

const categoryRouter = (categoryController) => {
  router.get(
    "/",
    handleAsync(async (req, res) => {
      const allCategory = await categoryController.findAllCategories();
      res.status(200).json({ success: true, data: allCategory });
    })
  );

  router.get(
    "/:id",
    handleAsync(async (req, res) => {
      const itemOfCategory = await categoryController.findItemsOfCategory(
        req.params.id
      );
      res.status(200).json({ success: true, data: itemOfCategory });
    })
  );

  return router;
};

module.exports = categoryRouter;

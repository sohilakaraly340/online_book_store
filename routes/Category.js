const express = require("express");
const { handleAsync } = require("../Errors/HandleAsync");
const router = express.Router();
const paginate = require("../middlewares/Pagination");
const category = require("../models/Category");
const categoryRouter = (categoryController) => {
  router.get(
    "/",
    paginate(category),
    handleAsync(async (req, res) => {
      const allCategory = await categoryController.getAllCategories();
      res.status(200).json({ success: true, data: req.paginatedResult });
    })
  );

  router.get(
    "/:id",
    handleAsync(async (req, res) => {
      const itemOfCategory = await categoryController.getAllItemsOfCategory(
        req.params.id
      );
      res.status(200).json({ success: true, data: itemOfCategory });
    })
  );

  return router;
};

module.exports = categoryRouter;

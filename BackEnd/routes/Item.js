const express = require("express");
const { handleAsync } = require("../Errors/HandleAsync");
const paginate = require("../middlewares/Pagination");
const items = require("../models/Item");
const router = express.Router();

const itemRouter = (itemController) => {
  router.get(
    "/newArrival",
    handleAsync(async (req, res) => {
      const items = await itemController.newArrival();
      res.status(200).json({ success: true, data: items });
    })
  );

  router.get(
    "/",
    paginate(items, [
      { path: "itemType" },
      { path: "category" },
      { path: "authorId" },
    ]),
    handleAsync(async (req, res) => {
      const allItems = await itemController.getAllItems();
      res.status(200).json({ success: true, data: req.paginatedResult });
    })
  );

  router.get(
    "/:id",
    handleAsync(async (req, res) => {
      const item = await itemController.getItemById(req.params.id);
      res.status(200).json({
        success: true,
        item: item.item,
        suggestionItems: item.suggestionItems,
      });
    })
  );

  router.get(
    "/search/:key",
    handleAsync(async (req, res, next) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;

      const searched = await itemController.search(req.params.key, page, limit);

      res.status(200).json({ success: true, data: searched });
    })
  );
  return router;
};

module.exports = itemRouter;

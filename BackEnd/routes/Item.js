const express = require("express");
const { handleAsync } = require("../Errors/HandleAsync");
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
    handleAsync(async (req, res) => {
      const allItems = await itemController.getAllItems();
      res.status(200).json({ success: true, data: allItems });
    })
  );

  router.get(
    "/:id",
    handleAsync(async (req, res) => {
      const item = await itemController.getItemById(req.params.id);
      res
        .status(200)
        .json({
          success: true,
          item: item.item,
          suggestionItems: item.suggestionItems,
        });
    })
  );

  router.get(
    "/search/:key",
    handleAsync(async (req, res) => {
      const searched = await itemController.search(req.params.key);
      res.status(200).json({ success: true, data: searched });
    })
  );

  return router;
};

module.exports = itemRouter;

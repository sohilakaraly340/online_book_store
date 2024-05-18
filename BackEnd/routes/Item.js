const express = require("express");
const { handleAsync } = require("../Errors/HandleAsync");
const router = express.Router();

const itemRouter = (itemController) => {
  router.get(
    "/",
    handleAsync(async (req, res) => {
      const allItems = await itemController.GetAllItems();
      res.status(200).json({ success: true, data: allItems });
    })
  );

  router.get(
    "/:id",
    handleAsync(async (req, res) => {
      const item = await itemController.GetItemById(req.params.id);
      res.status(200).json({ success: true, data: item });
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

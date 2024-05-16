const express = require("express");
const { handleAsync } = require("../../Errors/handleAsync");
const router = express.Router();

const itemRouter = (itemController) => {
  router.get(
    "/",
    handleAsync(async (req, res) => {
      const allItems = await itemController.GetAllItems();
      res.status(200).json({ success: true, data: allItems });
    })
  );

  router.post(
    "/",
    handleAsync(async (req, res) => {
      const newItem = await itemController.AddItem(
        req.body,
        req.body.itemType,
        req.body.category
      );
      res.status(201).json({ success: true, data: newItem });
    })
  );

  router.delete(
    "/:id",
    handleAsync(async (req, res) => {
      await itemController.DeleteItem(req.params.id);
      res
        .status(200)
        .json({ success: true, message: "Item deleted successfully" });
    })
  );

  router.patch(
    "/:id",
    handleAsync(async (req, res) => {
      const updatedItem = await itemController.UpdateItem(
        req.params.id,
        req.body,
        req.body.category
      );
      res.status(200).json({ success: true, data: updatedItem });
    })
  );

  return router;
};

module.exports = itemRouter;

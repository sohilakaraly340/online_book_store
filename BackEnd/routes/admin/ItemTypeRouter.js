const express = require("express");
const router = express.Router();

const itemTypeRouter = (itemController) => {
  router.get("/", async (req, res) => {
    try {
      const itemType = await itemController.getItemTypes();
      res.status(200).json({ success: true, data: itemType });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const newItemType = await itemController.AddItemType(req.body);
      res.status(200).json({ success: true, data: newItemType });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const deleted = await itemController.DeleteItemType(req.params.id);
      res
        .status(200)
        .json({ success: true, data: "itemType deleted successfully" });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message });
    }
  });

  router.patch("/:id", async (req, res) => {
    try {
      const updated = await itemController.UpdateItemType(
        req.params.id,
        req.body
      );
      res.status(200).json({ success: true, data: updated });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message });
    }
  });

  return router;
};

module.exports = itemTypeRouter;

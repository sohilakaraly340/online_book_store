const express = require("express");
const router = express.Router();

const itemRouter = (itemController) => {
  router.get("/", async (req, res) => {
    try {
      const allItems = await itemController.GetAllItems();
      res.status(200).json({ success: true, data: allItems });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
  router.post("/", async (req, res) => {
    try {
      const newItem = await itemController.AddItem(
        req.body,
        req.body.itemType,
        req.body.category
      );
      res.status(200).json({ success: true, data: newItem });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
  router.delete("/:id", async (req, res) => {
    try {
      const deleted = await itemController.DeleteItem(req.params.id);
      if (!deleted) res.status(404).json({ message: "item not found" });
      res
        .status(200)
        .json({ success: true, data: "item deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
  router.patch("/:id", async (req, res) => {
    try {
      const item = await itemController.UpdateItem(req.params.id,req.body,req.body.category);
      res.status(200).json({ success: true, data: item });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
  router.get("/itemType", async (req, res) => {
    try {
      const itemType = await itemController.getItemTypes();
      res.status(200).json({ success: true, data: itemType });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
  router.post("/itemType", async (req, res) => {
    try {
      const newItemType = await itemController.AddItemType(req.body);
      res.status(200).json({ success: true, data: newItemType });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
  router.delete("/itemType/:id", async (req, res) => {
    try {
      const deleted = await itemController.DeleteItemType(req.params.id);
      res
        .status(200)
        .json({ success: true, data: "itemType deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
  router.patch("/itemType/:id", async (req, res) => {
    try {
      const updated = await itemController.UpdateItemType(req.params.id,req.body);
      res.status(200).json({ success: true, data: updated });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  return router;
};

module.exports = itemRouter;

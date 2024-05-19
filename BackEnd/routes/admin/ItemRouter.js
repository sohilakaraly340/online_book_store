const express = require("express");
const { handleAsync } = require("../../Errors/handleAsync");
const { admin } = require("../../middleware/admin");
const { uploadImage } = require("../../middleware/firebase");
const { uploadMultiple } = require("../../middleware/multer");
// const upload = require("../../middleware/multer");
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
    uploadMultiple,
    uploadImage,
    admin,
    handleAsync(async (req, res) => {
      const newItem = await itemController.AddItem(req.body);

      res.status(201).json({ success: true, data: newItem });
    })
  );

  router.patch(
    "/:id",
    uploadMultiple,
    uploadImage,
    admin,
    handleAsync(async (req, res) => {
      const updatedItem = await itemController.UpdateItem(
        req.params.id,
        req.body
      );
      res.status(200).json({ success: true, data: updatedItem });
    })
  );

  router.delete(
    "/:id",
    admin,
    handleAsync(async (req, res) => {
      await itemController.DeleteItem(req.params.id);
      res
        .status(200)
        .json({ success: true, message: "Item deleted successfully" });
    })
  );

  return router;
};

module.exports = itemRouter;

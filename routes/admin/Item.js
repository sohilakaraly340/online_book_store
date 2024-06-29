const express = require("express");
const { handleAsync } = require("../../Errors/handleAsync");
const { admin } = require("../../middlewares/Admin");
const { uploadImage } = require("../../middlewares/firebase");
const { uploadMultiple } = require("../../middlewares/Multer");
const router = express.Router();

const itemRouter = (itemController) => {
  router.post(
    "/",
    uploadMultiple,
    uploadImage,
    admin,
    handleAsync(async (req, res) => {
      const newItem = await itemController.createNewItem(req.body);

      res.status(201).json({ success: true, data: newItem });
    })
  );

  router.get(
    "/options",
    handleAsync(async (req, res) => {
      const options = await itemController.selectOptions();

      res.status(201).json({ success: true, data: options });
    })
  );

  router.patch(
    "/:id",
    uploadMultiple,
    uploadImage,
    admin,
    handleAsync(async (req, res) => {
      const updatedItem = await itemController.updateItem(
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
      await itemController.deleteItemById(req.params.id);
      res
        .status(200)
        .json({ success: true, message: "Item deleted successfully" });
    })
  );

  return router;
};

module.exports = itemRouter;

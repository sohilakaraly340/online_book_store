const express = require("express");
const { handleAsync } = require("../Errors/HandleAsync");
const { auth } = require("../middlewares/Auth");
const { uploadImage } = require("../middlewares/firebase");
const { uploadMultiple } = require("../middlewares/Multer");
const router = express.Router();

const usedItemRouter = (usedItemController) => {
  router.get(
    "/",
    handleAsync(async (req, res) => {
      const data = await usedItemController.getAllUsedItems();
      res.status(200).json({ success: true, data: data });
    })
  );

  router.get(
    "/user",
    auth,
    handleAsync(async (req, res) => {
      const data = await usedItemController.getCurrentUsedUsedItems(req.auth);
      res.status(200).json({ success: true, data: data });
    })
  );

  router.get(
    "/:id",
    handleAsync(async (req, res) => {
      const data = await usedItemController.getUsedItemById(req.params.id);
      res.status(200).json({ success: true, data: data });
    })
  );

  router.post(
    "/",
    uploadMultiple,
    uploadImage,
    auth,
    handleAsync(async (req, res) => {
      const data = await usedItemController.createNewUsedItem(
        req.auth,
        req.body
      );
      res.status(200).json({ success: true, data: data });
    })
  );

  router.patch(
    "/:id",
    uploadMultiple,
    uploadImage,
    auth,
    handleAsync(async (req, res) => {
      const data = await usedItemController.updateUsedItemById(
        req.auth,
        req.params.id,
        req.body
      );
      res.status(200).json({ data: data });
    })
  );

  router.delete(
    "/:id",
    auth,
    handleAsync(async (req, res) => {
      const data = await usedItemController.deleteUsedItem(req.params.id);
      res.status(200).json({ data: data });
    })
  );
  return router;
};

module.exports = usedItemRouter;

const express = require("express");
const { handleAsync } = require("../../Errors/HandleAsync");
const { admin } = require("../../middlewares/Admin");
const upload = require("../../middlewares/Multer");
const router = express.Router();

const itemRouter = (itemController) => {
  router.post(
    "/",
    upload.array("images", 2),
    admin,
    handleAsync(async (req, res) => {
      const body = {
        ...req.body,
        images: req.files ? req.files.map((file) => file.filename) : [],
      };

      const newItem = await itemController.AddItem(body);

      res.status(201).json({ success: true, data: newItem });
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

  router.patch(
    "/:id",
    upload.array("images", 2),
    admin,
    handleAsync(async (req, res) => {
      const body = {
        ...req.body,
        images: req.files ? req.files.map((file) => file.filename) : [],
      };
      const updatedItem = await itemController.UpdateItem(req.params.id, body);
      res.status(200).json({ success: true, data: updatedItem });
    })
  );

  return router;
};

module.exports = itemRouter;

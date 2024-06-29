const express = require("express");
const { handleAsync } = require("../../Errors/handleAsync");
const { admin } = require("../../middlewares/Admin");
const router = express.Router();

const usedItemRouter = (usedItemController) => {
  router.delete(
    "/:id",
    admin,
    handleAsync(async (req, res) => {
      await usedItemController.deleteUsedItem(req.params.id);
      res
        .status(200)
        .json({ success: true, message: "Item deleted successfully" });
    })
  );

  return router;
};

module.exports = usedItemRouter;

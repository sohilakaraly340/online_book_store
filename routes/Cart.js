const express = require("express");
const { auth } = require("../middlewares/Auth");
const { handleAsync } = require("../Errors/HandleAsync");
const router = express.Router();

const cartRouter = (cartController) => {
  router.get(
    "/",
    auth,
    handleAsync(async (req, res) => {
      const data = await cartController.getAllCarts();
      res.status(200).json({ success: true, data: data });
    })
  );

  router.get(
    "/:id",
    handleAsync(async (req, res) => {
      const data = await cartController.getCartByUserId(req.params.id);

      res.status(200).json({ success: true, data: data });
    })
  );

  router.delete(
    "/:id",
    handleAsync(async (req, res) => {
      await cartController.deleteCartById(req.params.id);

      res.status(200).json("Deleted successfully");
    })
  );

  return router;
};

module.exports = cartRouter;

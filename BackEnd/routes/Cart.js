const express = require("express");
const { auth } = require("../middlewares/Auth");
const { handleAsync } = require("../Errors/HandleAsync");
const router = express.Router();

const cartRouter = (cartController) => {
  router.get(
    "/",
    auth,
    handleAsync(async (req, res) => {
      const data = await cartController.getAllCartsController();
      res.status(200).send(data);
    })
  );

  router.get(
    "/:id",
    handleAsync(async (req, res) => {
      const data = await cartController.getCartByUserIdController(
        req.params.id
      );

      res.status(200).send(data);
    })
  );

  router.delete(
    "/:id",
    handleAsync(async (req, res) => {
      await cartController.deleteCartController(req.params.id);

      res.status(200).json("Deleted successfully");
    })
  );

  return router;
};

module.exports = cartRouter;

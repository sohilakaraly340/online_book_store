const express = require("express");
const { auth } = require("../middlewares/Auth");
const { handleAsync } = require("../Errors/HandleAsync");
const router = express.Router();

const shoppingItemRouter = (shoppingItemsController) => {
  router.get(
    "/",
    auth,
    handleAsync(async (req, res) => {
      const data =
        await shoppingItemsController.getAllCurrentCartshoppingItemsController(
          req.headers
        );
      res.status(200).json({ data: data });
    })
  );

  router.post(
    "/",
    auth,
    handleAsync(async (req, res) => {
      const data = await shoppingItemsController.addToCartController(
        req.auth,
        req.body
      );

      res.status(200).json({ data: data });
    })
  );

  router.patch(
    "/:id",
    auth,
    handleAsync(async (req, res) => {
      await shoppingItemsController.updateShoppingItemController(
        req.params.id,
        req.body,
        req.auth
      );

      res.status(200).json("Updated successfully");
    })
  );

  router.delete(
    "/",
    auth,
    handleAsync(async (req, res) => {
      const data = await shoppingItemsController.clearAllShoppingItemsFromCart(
        req.auth
      );

      res.status(200).json({ data: data });
    })
  );

  router.delete(
    "/:id",
    auth,
    handleAsync(async (req, res) => {
      await shoppingItemsController.removeShoppingItemFromCartController(
        req.params.id,
        req.auth
      );

      res.status(200).json("Deleted successfully");
    })
  );

  return router;
};

module.exports = shoppingItemRouter;

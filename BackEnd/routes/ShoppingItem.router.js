const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();

const shoppingItemRouter = (shoppingItemsController) => {
  router.get("/", auth, async (req, res) => {
    try {
      const data =
        await shoppingItemsController.getAllCurrentCartshoppingItemsController(
          req.headers
        );
      res.status(200).json({ data: data });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Something went wrong",
      });
    }
  });

  router.post("/", auth, async (req, res) => {
    try {
      const data = await shoppingItemsController.addToCartController(
        req.auth,
        req.body
      );

      res.status(200).json({ data: data });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Something went wrong",
      });
    }
  });

  router.patch("/:id", auth, async (req, res) => {
    try {
      await shoppingItemsController.updateShoppingItemController(
        req.params.id,
        req.body,
        req.auth
      );

      res.status(200).json("Updated successfully");
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Something went wrong",
      });
    }
  });

  router.delete("/", auth, async (req, res) => {
    try {
      const data = await shoppingItemsController.clearAllShoppingItemsFromCart(
        req.auth
      );

      res.status(200).json({ data: data });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Something went wrong",
      });
    }
  });

  router.delete("/:id", auth, async (req, res) => {
    try {
      await shoppingItemsController.removeShoppingItemFromCartController(
        req.params.id,
        req.auth
      );

      res.status(200).json("Deleted successfully");
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Something went wrong",
      });
    }
  });

  return router;
};

module.exports = shoppingItemRouter;

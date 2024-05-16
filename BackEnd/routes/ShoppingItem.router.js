const express = require("express");
const router = express.Router();

const shoppingItemRouter = (shoppingItemsController) => {
  router.get("/", async (req, res) => {
    try {
      const data =
        await shoppingItemsController.getAllCurrentCartshoppingItemsController();
      res.status(200).json({ data: data });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Something went wrong",
      });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const data = await shoppingItemsController.addToCartController(req.body);
      res.status(200).json({ data: data });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Something went wrong",
      });
    }
  });

  router.patch("/:id", async (req, res) => {
    try {
      const data = await shoppingItemsController.updateShoppingItemController(
        req.params.id,
        req.body
      );
      res.status(200).json("Updated successfully");
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Something went wrong",
      });
    }
  });

  router.patch("/clearcart/:id", async (req, res) => {
    try {
      const data = await shoppingItemsController.clearShoppingItemsFromCart(
        req.params.id
      );
      res.status(200).json({ data: data });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Something went wrong",
      });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      await shoppingItemsController.removeShoppingItemFromCartController(
        req.params.id
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

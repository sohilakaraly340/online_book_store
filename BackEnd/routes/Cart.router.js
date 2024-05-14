const express = require("express");
const router = express.Router();

const cartRouter = (cartController, shoppingItemsController) => {
  router.get("/", async (req, res) => {
    try {
      const data =
        await shoppingItemsController.getAllCurrentCartshoppingItemsController();
      res.status(200).send(data);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  });

  router.post("/addToCart", async (req, res) => {
    try {
      const data = await shoppingItemsController.addToCartController(req.body);
      //console.log(data);
      res.status(200).json({ data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  });

  router.patch("/:id", async (req, res) => {
    try {
      const data = await shoppingItemsController.updateShoppingItemController(
        req.params.id,
        req.body
      );
      console.log(data);
      res.status(200).json("Updated successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  });

  router.patch("/clearcart/:id", async (req, res) => {
    try {
      const data = await shoppingItemsController.clearShoppingItemsFromCart(
        req.params.id
      );
      res.status(200).send(data);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  });

  router.delete("/removefromcart/:id", async (req, res) => {
    try {
      await shoppingItemsController.removeShoppingItemFromCartController(
        req.params.id
      );
      res.status(200).json("Deleted successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  });

  router.delete("/:id", async (req, res) => {
    console.log(req.params.id);
    try {
      const data = await cartController.deleteCartController(req.params.id);
      res.status(200).json("Deleted successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  });

  return router;
};

module.exports = cartRouter;

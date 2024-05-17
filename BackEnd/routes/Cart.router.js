const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();

const cartRouter = (cartController) => {
  router.get("/", auth, async (req, res) => {
    try {
      const data = await cartController.getAllCartsController();
      res.status(200).send(data);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const data = await cartController.getCartByUserIdController(
        req.params.id
      );

      res.status(200).send(data);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      await cartController.deleteCartController(req.params.id);

      res.status(200).json("Deleted successfully");
    } catch (error) {
      res.status(500).json({ message: error });
    }
  });

  return router;
};

module.exports = cartRouter;

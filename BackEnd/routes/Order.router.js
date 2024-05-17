const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();
const orderRouter = (orderController) => {
  router.get("/:id", async (req, res) => {
    try {
      const data = await orderController.getOrderByIdController(req.params.id);

      res.status(200).json({ data: data });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });

  router.get("/", auth, async (req, res) => {
    try {
      const data = await orderController.getCurrentUserOrdersController(
        req.auth
      );

      res.status(200).json({ data: data });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });

  router.post("/", auth, async (req, res) => {
    try {
      const data = await orderController.createNewOrderController(
        req.auth,
        req.body
      );

      res.status(200).json({ data: data });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });
  return router;
};

module.exports = orderRouter;

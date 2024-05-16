const express = require("express");
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

  router.get("/", async (req, res) => {
    try {
      const data = await orderController.getCurrentUserOrdersController();
      console.log(data);
      res.status(200).json({ data: data });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const data = await orderController.createNewOrderController(req.body);
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

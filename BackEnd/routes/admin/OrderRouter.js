const express = require("express");
const { admin } = require("../../middleware/admin");
const router = express.Router();

const orderRouter = (orderController) => {
  router.get("/", admin, async (req, res) => {
    try {
      const data = await orderController.getAllorderController();

      res.status(200).json({ data: data });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });

  router.patch("/:id", admin, async (req, res) => {
    try {
      const data = await orderController.updateOrderController(
        req.params.id,
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

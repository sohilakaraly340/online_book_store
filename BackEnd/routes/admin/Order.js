const express = require("express");
const { admin } = require("../../middlewares/Admin");
const paginate = require("../../middlewares/Pagination");
const router = express.Router();
const orders = require("../../models/Order")

const orderRouter = (orderController) => {
  router.get("/", admin,paginate(orders), async (req, res) => {
    try {
      const data = await orderController.getAllorder();

      res.status(200).json({ data: req.paginatedResult  });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });

  router.patch("/:id", admin, async (req, res) => {
    try {
      const data = await orderController.updateOrderById(
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

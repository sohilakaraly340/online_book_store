const express = require("express");
const { auth } = require("../middlewares/Auth");
const { handleAsync } = require("../Errors/handleAsync");
const router = express.Router();
const orderRouter = (orderController) => {
  router.get(
    "/:id",
    handleAsync(async (req, res) => {
      const data = await orderController.getOrderById(req.params.id);

      res.status(200).json({ success: true, data: data });
    })
  );

  router.get(
    "/",
    auth,
    handleAsync(async (req, res) => {
      const data = await orderController.getCurrentUserOrders(req.auth);

      res.status(200).json({ success: true, data: data });
    })
  );

  router.post(
    "/",
    auth,
    handleAsync(async (req, res) => {
      const data = await orderController.createNewOrder(req.auth, req.body);

      res.status(200).json({ success: true, data: data });
    })
  );

  router.patch(
    "/update/:id",
    auth,
    handleAsync(async (req, res) => {
      const data = await orderController.cancelOrder(req.params.id);
      res.status(200).json({ success: true, data: data });
    })
  );

  router.patch("/:id", auth, async (req, res) => {
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

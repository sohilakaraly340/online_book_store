const express = require("express");
const { auth } = require("../middlewares/Auth");
const { handleAsync } = require("../Errors/HandleAsync");
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
    "/:id",
    auth,
    handleAsync(async (req, res) => {
      const data = await orderController.cancelOrder(req.params.id);
      res.status(200).json({ success: true, data: data });
    })
  );

  return router;
};

module.exports = orderRouter;

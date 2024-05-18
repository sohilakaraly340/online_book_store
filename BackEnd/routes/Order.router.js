const express = require("express");
const { auth } = require("../middleware/auth");
const { handleAsync } = require("../Errors/handleAsync");
const router = express.Router();
const orderRouter = (orderController) => {
  router.get(
    "/:id",
    handleAsync(async (req, res) => {
      const data = await orderController.getOrderByIdController(req.params.id);

      res.status(200).json({ data: data });
    })
  );

  router.get(
    "/",
    auth,
    handleAsync(async (req, res) => {
      const data = await orderController.getCurrentUserOrdersController(
        req.auth
      );

      res.status(200).json({ data: data });
    })
  );

  router.post(
    "/",
    auth,
    handleAsync(async (req, res) => {
      const data = await orderController.createNewOrderController(
        req.auth,
        req.body
      );

      res.status(200).json({ data: data });
    })
  );
  return router;
};

module.exports = orderRouter;

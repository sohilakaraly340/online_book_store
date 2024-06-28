const express = require("express");
const Stripe = require("stripe");
const { STRIPE_KEY } = require("../constants");
const { handleAsync } = require("../Errors/handleAsync");

const stripe = Stripe(STRIPE_KEY);
const router = express.Router();

const StripeRouter = (OrderController) => {
  router.post(
    "/create-checkout-session",
    handleAsync(async (req, res) => {
      const id = req.body.orderId;
      const order = await OrderController.getOrderById(id);
      const line_items = order.orderItems.map((itm) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: itm.item.title,
              description: itm.item.description,
            },
            unit_amount: Math.round(itm.item.price * 100),
          },
          quantity: itm.quantity,
        };
      });
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}orderconfirmation`,
        cancel_url: `${process.env.CLIENT_URL}/payment`,
      });

      res.status(200).json({ success: true, url: session.url });
    })
  );

  return router;
};

module.exports = StripeRouter;

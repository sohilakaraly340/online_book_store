const express = require("express");
const Stripe = require("stripe");
const { STRIPE_KEY, DB_URL } = require("../constants");

const stripe = Stripe(`${STRIPE_KEY}`);
const router = express.Router();
router.post("/create-checkout-session", async (req, res) => {

    const line_items= req.body.orderItems.map((item)=>{
        
    })
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "{{PRICE_ID}}",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${DB_URL}/success.html`,
    cancel_url: `${DB_URL}/cancel.html`,
  });

  res.send({url: session.url} );
});
module.exports=router;

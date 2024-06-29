const express = require("express");
const { handleAsync } = require("../Errors/handleAsync");
const { auth } = require("../middlewares/Auth");
const router = express.Router();

const ratingRouter = (ratingController) => {
  router.post(
    "/:id",
    auth,
    handleAsync(async (req, res) => {
      const user = req.auth;
      const item = req.params.id;
      const isRated = await ratingController.getUserRate({
        user: user._id,
        item,
      });

      if (isRated)
        return res.status(401).send({ message: "this item already rated" });
      const rate = +req.body.rate;

      const newRate = await ratingController.createRate({
        user: user._id,
        item,
        rate,
      });
      res.status(201).json({ success: true, data: "Item rated successfully" });
    })
  );

  router.get(
    "/:id",
    handleAsync(async (req, res) => {
      const item = req.params.id;

      const ratings = await ratingController.getAllItemRate(item);
      if (ratings.length == 0) res.status(200).json({ itemRate: 0.0 });

      const averageRating =
        ratings.reduce((acc, rating) => acc + rating.rate, 0) / ratings.length;
      res.status(200).json({ itemRate: averageRating });
    })
  );
  return router;
};
module.exports = ratingRouter;

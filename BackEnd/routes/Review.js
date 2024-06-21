const express = require("express");
const { handleAsync } = require("../Errors/HandleAsync");
const { auth } = require("../middlewares/Auth");

const router = express.Router();

const reviewRouter = (reviewController, itemController) => {
  router.post(
    "/:id",
    auth,
    handleAsync(async (req, res) => {
      const id = req.params.id;
      const { review } = req.body;
      const user = req.auth;

      const item = await itemController.getItemById(id);
      if (!item) {
        return res.status(404).json("this item not found");
      }

      const newReview = await reviewController.createReview({
        user: user._id,
        item: id,
        review,
      });
      res.status(201).json({ success: true, data: newReview });
    }),

    router.get(
      "/:id",
      handleAsync(async (req, res) => {
        const reviews = await reviewController.getAllReviews(req.params.id);
        if (reviews.length == 0)
          return res.status(404).json({ message: " this item has no review" });
        res.status(200).json({ success: true, Reviews: reviews });
      })
    ),

    router.delete(
      "/:id",
      auth,
      handleAsync(async (req, res) => {
        const reviewId = await reviewController.getReviews(req.params.id);
        if (!reviewId)
          return res.status(404).json({ message: "review not found" });

        const deleted = await reviewController.deleteReview(req.params.id);
        res
          .status(200)
          .json({ success: true, message: "Review deleted successfully" });
      })
    ),

    router.patch(
      "/:id",
      auth,
      handleAsync(async (req, res) => {
        const reviewId = await reviewController.getReviews(req.params.id);
        if (!reviewId)
          return res.status(404).json({ message: "review not found" });

        const updated = await reviewController.updateReview(
          req.params.id,
          req.body
        );
        res.status(200).json({ success: true, data: updated });
      })
    ),

  );
  return router;
};

module.exports = reviewRouter;

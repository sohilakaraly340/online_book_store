const express = require("express");
const { handleAsync } = require("../handleErrors/handleAsync");
const router = express.Router();

const wishListRouter = (wishListController) => {
  router.get(
    "/",
    handleAsync(async (req, res) => {
      const allWishList = await wishListController.getAllUsersWishList(
        req.headers.email
      );
      res.status(200).json({ success: true, data: allWishList });
    })
  );

  router.post(
    "/",
    handleAsync(async (req, res) => {
      const toggleWishList = await wishListController.updateWishList(
        req.body._id,
        req.headers.email
      );
      res.status(200).json({ success: true, data: toggleWishList });
    })
  );

  return router;
};

module.exports = wishListRouter;

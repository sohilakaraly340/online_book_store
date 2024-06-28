const express = require("express");
const { handleAsync } = require("../Errors/HandleAsync");
const { auth } = require("../middlewares/Auth");
const router = express.Router();

const wishListRouter = (wishListController) => {
  router.get(
    "/",
    auth,
    handleAsync(async (req, res) => {
      const allWishList = await wishListController.getAllUsersWishList(
        req.auth
      );
      res.status(200).json({ success: true, data: allWishList });
    })
  );

  router.post(
    "/",
    auth,
    handleAsync(async (req, res) => {
      const toggleWishList = await wishListController.updateWishList(
        req.body._id,
        req.auth
      );
      res.status(200).json({ success: true, data: toggleWishList });
    })
  );

  return router;
};

module.exports = wishListRouter;

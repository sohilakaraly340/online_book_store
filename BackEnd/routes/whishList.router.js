const express = require("express");
const router = express.Router();

const wishListRouter = (wishListController) => {
  router.get("/", async (req, res) => {
    try {
      const allWishList = await wishListController.getAllUsersWishList(
        req.headers.email
      );
      res.status(200).json({ success: true, data: allWishList });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const toggleWishList = await wishListController.updateWishList(
        req.body._id,
        req.headers.email
      );
      res.status(200).json({ success: true, data: toggleWishList });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message });
    }
  });
  return router;
};

// wishListRouter.post('/',(req,res)=>wishListController.updateWishList(req,res))

module.exports = wishListRouter;

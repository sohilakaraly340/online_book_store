const express = require("express");
const { handleAsync } = require("../../Errors/handleAsync");
const { admin } = require("../../middlewares/Admin");
const paginate = require("../../middlewares/Pagination");
const router = express.Router();
const users = require("../../models/User");
const userRouter = (userController) => {
  router.get(
    "/",
    admin,
    paginate(users, [{ path: "wishList" }]),
    handleAsync(async (req, res) => {
      await userController.getAllUser();
      res.status(200).json({ success: true, data: req.paginatedResult });
    })
  );

  router.post(
    "/",
    handleAsync(async (req, res) => {
      const sendOTP = await userController.addAdmin(req.body);
      res.status(200).json({ success: true, data: sendOTP });
    })
  );

  router.post(
    "/verfiy-otp",
    handleAsync(async (req, res) => {
      const verifyOTP = await userController.verifyOtp(req.body);
      res.status(200).json({ success: true, data: verifyOTP });
    })
  );

  return router;
};

module.exports = userRouter;

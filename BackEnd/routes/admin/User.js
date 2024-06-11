const express = require("express");
const { handleAsync } = require("../../Errors/HandleAsync");
const { admin } = require("../../middlewares/Admin");
const paginate = require("../../middlewares/Pagination");
const router = express.Router();
const users = require("../../models/User")
const userRouter = (userController) => {
  router.get(
    "/",
    admin,paginate(users),
    handleAsync(async (req, res) => {
      const allUser = await userController.getAllUser();
      res.status(200).json({ success: true, data: req.paginatedResult });
    })
  );

  return router;
};

module.exports = userRouter;

const express = require("express");
const { handleAsync } = require("../../Errors/handleAsync");
const { admin } = require("../../middleware/admin");
const router = express.Router();

const userRouter = (userController) => {
  router.get(
    "/",
    admin,
    handleAsync(async (req, res) => {
      const allUser = await userController.findAllUsers();
      res.status(200).json({ success: true, data: allUser });
    })
  );

  return router;
};

module.exports = userRouter;

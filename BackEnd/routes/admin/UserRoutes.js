const express = require("express");
const { handleAsync } = require("../../handleErrors/handleAsync");
const router = express.Router();

const userRouter = (userController) => {
  router.get(
    "/",
    handleAsync(async (req, res) => {
      const allUser = await userController.findAllUsers();
      res.status(200).json({ success: true, data: allUser });
    })
  );

  return router;
};

module.exports = userRouter;

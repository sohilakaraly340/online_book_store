const express = require("express");
const { handleAsync } = require("../Errors/handleAsync");
const router = express.Router();

const userRouter = (userController) => {
  router.post(
    "/",
    handleAsync(async (req, res) => {
      const newUser = await userController.createNewUser(req.body);
      res.status(201).json({ success: true, data: newUser });
    })
  );

  router.post(
    "/login",
    handleAsync(async (req, res) => {
      const logged = await userController.login(req.body);
      res.status(200).header("Authorization", logged.token).json(logged);
    })
  );

  return router;
};

module.exports = userRouter;

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
      res.status(200).json(logged);
    })
  );

  router.get(
    "/",
    handleAsync(async (req, res) => {
      const profile = await userController.getCurrentProfile(req.headers.email);
      res.status(200).json({ success: true, data: profile });
    })
  );

  router.patch(
    "/",
    handleAsync(async (req, res) => {
      const updated = await userController.UpdateUserProfile(
        req.headers.email,
        req.body
      );
      res.status(200).json({ success: true, message: updated });
    })
  );

  return router;
};

module.exports = userRouter;

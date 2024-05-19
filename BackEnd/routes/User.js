const express = require("express");
const { handleAsync } = require("../Errors/HandleAsync");
const { auth } = require("../middlewares/Auth");
const { uploadImage } = require("../middlewares/firebase");
const { uploadSingle } = require("../middlewares/Multer");

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
    auth,
    handleAsync(async (req, res) => {
      const profile = await userController.getCurrentUserProfile(req.auth);
      res.status(200).json({ success: true, data: profile });
    })
  );

  router.patch(
    "/",
    uploadSingle,
    uploadImage,
    auth,
    handleAsync(async (req, res) => {
      const updated = await userController.UpdateUserProfile(
        req.auth,
        req.body
      );
      res.status(200).json({ success: true, message: updated });
    })
  );

  return router;
};

module.exports = userRouter;

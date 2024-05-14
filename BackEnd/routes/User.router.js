const express = require("express");
const router = express.Router();

const { validatUsers } = require("../validation/User.validator");

const userRouter = (userController) => {
  router.post("/", async (req, res) => {
    try {
      const newUser = await userController.createNewUser(req.body);
      res.status(200).json({ success: true, data: newUser });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  router.post("/login", async (req) => {
    try {
      const logged = await userController.login(req.body);
      res.status(200).json(logged);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  return router;
};

module.exports = userRouter;

const express = require("express");
const router = express.Router();

const userRouter = (userController) => {
  router.post("/", async (req, res) => {
    try {
      const newUser = await userController.createNewUser(req.body);
      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message });
    }
  });


  router.post("/login", async (req, res) => {
    try {
      const logged = await userController.login(req.body);
      res.status(200).header("Authorization", logged.token).json(logged);
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message });
    }
  });

  return router;
};

module.exports = userRouter;

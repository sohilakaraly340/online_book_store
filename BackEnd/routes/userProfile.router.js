const express = require("express");
const router = express.Router();
const bycrypt = require("bcrypt");

const userProfile = (userProfileController) => {
  router.get("/", async (req, res) => {
    try {
      const profile = await userProfileController.getCurrentProfile(
        req.headers.email
      );
      res.status(200).json({ success: true, data: profile });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message });
    }
  });

  router.patch("/", async (req, res) => {
    try {
      
      const updated = await userProfileController.UpdateUserProfile(
        req.headers.email,
        req.body
      );
      res.status(200).json({ success: true, message: updated });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message });
    }
  });

  return router;
};

module.exports = userProfile;

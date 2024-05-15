const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { handleAsync } = require("../handleErrors/handleAsync");

const userProfile = (userProfileController) => {
  router.get(
    "/",
    handleAsync(async (req, res) => {
      const profile = await userProfileController.getCurrentProfile(
        req.headers.email
      );
      res.status(200).json({ success: true, data: profile });
    })
  );

  router.patch(
    "/",
    handleAsync(async (req, res) => {
      if (req.body.email) {
        return res.status(400).json({ message: "Can't change email!" });
      }

      if (req.body.password) {
        const newPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = newPassword;
      }

      const updated = await userProfileController.UpdateUserProfile(
        req.headers.email,
        req.body
      );
      res.status(200).json({ success: true, message: updated });
    })
  );

  return router;
};

module.exports = userProfile;

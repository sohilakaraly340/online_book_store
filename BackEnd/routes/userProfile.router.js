const express = require("express");
const { handleAsync } = require("../handleErrors/handleAsync");
const router = express.Router();

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

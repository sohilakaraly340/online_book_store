const express = require("express");
const userProfile = express.Router();
const UserProfileRepo = require("../repository/UserProfile.repository");
const UserProfileController = require("../controllers/UserProfile.controller");

const user = require("../models/User.schema");
const { validatUsers } = require("../validation/User.validator");

const userProfileRepository = new UserProfileRepo(user);
const userProfileController = new UserProfileController(
  userProfileRepository,
  validatUsers
);

userProfile.get("/", (req, res) =>
  userProfileController.getCurrentProfile(req, res)
);
userProfile.patch("/", (req, res) =>
  userProfileController.UpdateUserProfile(req, res)
);

module.exports = userProfile;

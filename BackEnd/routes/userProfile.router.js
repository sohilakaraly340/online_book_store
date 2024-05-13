const express = require("express");
const router = express.Router();
const bycrypt = require("bcrypt");
// const UserProfileRepo = require("../repository/UserProfile.repository");
// const UserProfileController = require("../controllers/UserProfile.controller");

// const user = require("../models/User.schema");
const { validatUsers } = require("../validation/User.validator");

// const userProfileRepository = new UserProfileRepo(user);
// const userProfileController = new UserProfileController(
//   userProfileRepository,
//   validatUsers
// );

const userProfile = (userProfileController) => {
  router.get("/", async (req, res) => {
    try {
      const profile = await userProfileController.getCurrentProfile(
        req.headers.email
      );
      res.status(200).json({ success: true, data: profile });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  router.patch('/',async(req,res)=>{
    try{
      const { error, value } = await validatUsers(req.body);
      if (error) return res.status(422).json({ message: error.message });

      if (req.body.email) {
        return res.end("can't change email!");
      }

      if (req.body.password) {
        req.body.encryptedPassword = await bycrypt.hash(req.body.password, 10);
        delete req.body.password;
        req.body.password = req.body.encryptedPassword;
      }
      const updated=await userProfileController.UpdateUserProfile(req.headers.email,req.body)
      res.json(updated);
    }catch(error){
      res.status(500).json({success: false , message: error.message})
    }
  })

  return router;
};


module.exports = userProfile;

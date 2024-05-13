const bycrypt = require("bcrypt");

class UserProfileController {
  constructor(userProfileRepo, validatUsers) {
    this.userProfileRepo = userProfileRepo;
    this.validatUsers = validatUsers;
  }

  async getCurrentProfile(req, res) {
    try {
      const currentUser = await this.userProfileRepo.getUser(req.headers.email);

      if (!currentUser) res.json("Un authorized");
      res.status(200).json({
        success: "true",
        data: {
          _id: currentUser._id,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          password: currentUser.password,
          phoneNumber: currentUser.phoneNumber,
          image: currentUser.image,
          address: currentUser.address,
        },
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async UpdateUserProfile(req, res) {
    try {
      const { error, value } = await this.validatUsers(req.body);
      if (error) return res.status(422).json({ message: error.message });

      if (req.body.email) {
        res.end("can't change email!");
        return;
      }

      if (req.body.password) {
        req.body.encryptedPassword = await bycrypt.hash(req.body.password, 10);
        // console.log(req.body.password);
        delete req.body.password;
        req.body.password = req.body.encryptedPassword;
      }

      const updatedProfile = await this.userProfileRepo.updateProfile(
        req.headers.email,
        req.body
      );
      const user = await this.userProfileRepo.getUser(req.headers.email);
      res.status(200).json(user);
    } catch (e) {
      console.error("Error:", e);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
module.exports = UserProfileController;

const { deleteOne } = require("../models/Cart.schema");
const validator = require("../validation/User.validator");
const bycrypt = require("bcrypt");
class UserProfileController {
  constructor(userProfileRepo) {
    this.userProfileRepo = userProfileRepo;
  }

  async getCurrentProfile(email) {
    try {
      return await this.userProfileRepo.getUser(email);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async UpdateUserProfile(emailHeader,emailBody, body) {
    try {
      const { error, value } = validator.validatUsers(body);
      if (error) return { message: error.message };

      if (emailBody) {
        return ("can't change email!");
      }
      if (body.password) {
        const encryptedPassword = await bycrypt.hash(body.password, 10);
        delete body.password;
        
        body.password = encryptedPassword;
       
      }

      return await this.userProfileRepo.updateProfile(emailHeader, body);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
module.exports = UserProfileController;

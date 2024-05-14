const { BadRequestError } = require("../handleErrors/badRequestError");
const { InternalServerError } = require("../handleErrors/internalServerError");
const validator = require("../validation/User.validator");
const bycrypt = require("bcrypt");
class UserProfileController {
  constructor(userProfileRepo) {
    this.userProfileRepo = userProfileRepo;
  }

  async getCurrentProfile(email) {
    return await this.userProfileRepo.getUser(email);
  }

  async UpdateUserProfile(emailHeader, body) {
    try {
      const { error, value } = validator.validatUsers(body);
      if (error) return { message: error.message };

      if (body.email) {
        return ("can't change email!");
      }
      if (body.password) {
        const encryptedPassword = await bycrypt.hash(body.password, 10);
        delete body.password;
        
        body.password = encryptedPassword;
       
      }

      return await this.userProfileRepo.updateProfile(emailHeader, body);
    } catch (error) {
      if (error instanceof BadRequestError)
        throw new BadRequestError(error.message);

      throw new InternalServerError(error.message);
    }
  }
}
module.exports = UserProfileController;

const { BadRequestError } = require("../Errors/badRequestError");
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
    const { error, value } = validator.validatUsers(body);
    if (error) throw new BadRequestError(`In valid data ${error.message}`);

    if (body.email) throw new BadRequestError(`can't change email!`);
    if (body.password) {
      const encryptedPassword = await bycrypt.hash(body.password, 10);
      delete body.password;

      body.password = encryptedPassword;
    }

    return await this.userProfileRepo.updateProfile(emailHeader, body);
  }
}
module.exports = UserProfileController;

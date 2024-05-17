const { BadRequestError } = require("../Errors/badRequestError");
const { ValidationError } = require("../Errors/validationError");
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
      const bodyClone =structuredClone(body)
      
      const { error, value } = validator.validatUsers(bodyClone);
      if (error) throw new BadRequestError(`In valid data ${error.message}`);

    if (body.email) throw new BadRequestError(`can't change email!`);
    if (body.password) {
      const encryptedPassword = await bycrypt.hash(body.password, 10);
      delete body.password;

      body.password = encryptedPassword;
    }
      if (bodyClone.email) throw new BadRequestError(`can't change email!`);

      let encryptedPassword;
      if (bodyClone.password) {
        encryptedPassword = await bycrypt.hash(bodyClone.password, 10);
        bodyClone.password=encryptedPassword;
      
      }
      return await this.userProfileRepo.updateProfile(
        emailHeader,
        bodyClone
      );
    } catch (error) {
      if (error instanceof BadRequestError)
        throw new BadRequestError(error.message);

      throw new InternalServerError(error.message);
    }
  }
}
module.exports = UserProfileController;

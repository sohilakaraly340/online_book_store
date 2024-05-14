const { BadRequestError } = require("../handleErrors/badRequestError");
const { InternalServerError } = require("../handleErrors/internalServerError");
const validator = require("../validation/User.validator");
class UserProfileController {
  constructor(userProfileRepo) {
    this.userProfileRepo = userProfileRepo;
  }

  async getCurrentProfile(email) {
    return await this.userProfileRepo.getUser(email);
  }

  async UpdateUserProfile(email, body) {
    try {
      const { error, value } = validator.validatUsers(body);
      if (error) {
        throw new BadRequestError(`In valid data ${error.message}`);
      }
      return await this.userProfileRepo.updateProfile(email, body);
    } catch (error) {
      if (error instanceof BadRequestError)
        throw new BadRequestError(error.message);

      throw new InternalServerError(error.message);
    }
  }
}
module.exports = UserProfileController;

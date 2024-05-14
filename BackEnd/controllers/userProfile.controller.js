const validator = require("../validation/User.validator");
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

  async UpdateUserProfile(email,body) {
    try {
      const { error, value } =  validator.validatUsers(body);
      if (error) return { message: error.message };
      
      return await this.userProfileRepo.updateProfile(email,body);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
module.exports = UserProfileController;

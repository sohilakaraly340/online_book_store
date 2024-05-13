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
      return await this.userProfileRepo.updateProfile(email,body);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
module.exports = UserProfileController;

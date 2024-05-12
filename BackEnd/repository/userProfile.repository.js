

class UserProfileRepository {
  constructor(user) {
    this.user = user;
  }

  async getUser(email) {
    try {
      const allUsers = await this.user.find();
      const user = await allUsers.find((u) => u.email == email);
      // console.log(user);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProfile(email, body) {
    try {
      const updated = await this.user.updateOne( {email}, body);
      
      return updated;
    } catch (error) {
      throw new Error(error.message);
      // console.log(error);
    }
  }
}
module.exports = UserProfileRepository;

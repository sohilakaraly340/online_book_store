const { NotFoundError } = require("../Errors/notFoundError");

class UserProfileRepository {
  constructor(user) {
    this.user = user;
  }
  handleError = (error) => {
    if (error instanceof NotFoundError) throw new NotFoundError(error.message);

    throw new InternalServerError(error.message);
  };

  async getUser(email) {
    try {
      const allUsers = await this.user.find();
      const user = await allUsers.find((u) => u.email == email);
      if (!user) throw new NotFoundError("user not found");
      return user;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateProfile(email, body) {
    try {
      const updated = await this.user.updateOne({ email }, body);

      if (!updated) throw new NotFoundError("User not found");

      return updated;
    } catch (error) {
      this.handleError(Error);
    }
  }
}
module.exports = UserProfileRepository;

const { NotFoundError } = require("../Errors/notFoundError");
const User = require("../models/User.schema");

class UserProfileRepository {
  handleError = (error) => {
    if (error instanceof NotFoundError) throw new NotFoundError(error.message);

    throw new InternalServerError(error.message);
  };

  async getUser(email) {
    try {
      const allUsers = await User.find();
      const user = await allUsers.find((u) => u.email == email);
      if (!user) throw new NotFoundError("user not found");
      return user;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateProfile(email, body) {
    try {
      const updated = await User.updateOne({ email }, body);

      if (!updated) throw new NotFoundError("User not found");

      return updated;
    } catch (error) {
      this.handleError(Error);
    }
  }
}
module.exports = UserProfileRepository;

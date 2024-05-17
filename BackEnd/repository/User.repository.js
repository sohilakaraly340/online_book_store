const bcrypt = require("bcrypt");
const { NotFoundError } = require("../Errors/notFoundError");
const { InternalServerError } = require("../Errors/internalServerError");
const User = require("../models/User.schema");

class UserRepository {
  handleError = (error) => {
    if (error instanceof NotFoundError) throw new NotFoundError(error.message);

    throw new InternalServerError(error.message);
  };

  async createUser(body) {
    try {
      const passwordHash = await bcrypt.hash(body.password, 10);
      if (!passwordHash)
        throw new InternalServerError("Error while hashed password");
      return await User.create({ ...body, password: passwordHash });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  async findByEmail(email) {
    try {
      const user = await User.findOne({ email });
      // if (!user) throw new NotFoundError("No user found");
      return user;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll() {
    try {
      const users = await User.find();
      if (!users) throw new NotFoundError("No users found!");
      return users;
    } catch (error) {
      this.handleError(error);
    }
  }
}

module.exports = UserRepository;

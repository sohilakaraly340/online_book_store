const bcrypt = require("bcrypt");
const { NotFoundError } = require("../handleErrors/notFoundError");
const { InternalServerError } = require("../handleErrors/internalServerError");

class UserRepository {
  constructor(user) {
    this.user = user;
  }

  handleError = (error) => {
    if (error instanceof NotFoundError) throw new NotFoundError(error.message);

    throw new InternalServerError(error.message);
  };

  async createUser(body) {
    try {
      const passwordHash = await bcrypt.hash(body.password, 10);
      if (!passwordHash)
        throw new InternalServerError("Error while hashed password");
      return await this.user.create({ ...body, password: passwordHash });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  async findByEmail(email) {
    try {
      const user = await this.user.findOne({ email });
      // if (!user) throw new NotFoundError("No user found");
      return user;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll() {
    try {
      const users = await this.user.find();
      if (!users) throw new NotFoundError("No users found!");
      return users;
    } catch (error) {
      this.handleError(error);
    }
  }
}

module.exports = UserRepository;

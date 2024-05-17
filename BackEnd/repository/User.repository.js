const bcrypt = require("bcrypt");
const { NotFoundError } = require("../Errors/notFoundError");
const { InternalServerError } = require("../Errors/internalServerError");
const User = require("../models/User.schema");

class UserRepository {
  async createUser(body) {
    const passwordHash = await bcrypt.hash(body.password, 10);
    if (!passwordHash)
      throw new InternalServerError("Error while hashed password");
    return await User.create({ ...body, password: passwordHash });
  }

  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async findAll() {
    const users = await User.find();
    if (!users) throw new NotFoundError("No users found!");
    return users;
  }

  async updateProfile(email, body) {
    const updated = await User.updateOne({ email }, body);

    if (!updated) throw new NotFoundError("User not found");

    return updated;
  }
}

module.exports = UserRepository;

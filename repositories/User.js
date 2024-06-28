const bcrypt = require("bcrypt");
const { NotFoundError } = require("../Errors/notFoundError");
const { InternalServerError } = require("../Errors/InternalServerError");
const User = require("../models/User");
const { deleteImages } = require("../middlewares/firebase");

class UserRepository {
  async createNewUser(body) {
    const passwordHash = await bcrypt.hash(body.password, 10);
    if (!passwordHash)
      throw new InternalServerError("Error while hashed password");
    await User.create({ ...body, password: passwordHash });
    return "User created successfull";
  }

  async findUserByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async getAllUser() {
    const users = await User.find();
    if (!users) throw new NotFoundError("No users found!");
    return users;
  }

  async updateProfile(email, body) {
    const user = await User.find({ email });
    if (!user) throw new NotFoundError("User not found");

    if (body.images) {
      deleteImages(user.images);
    }

    const updated = await User.updateOne({ email }, body);

    return updated;
  }
  async changePassword(email, body) {
    const result = await User.updateOne({ email }, { password: body.password });
    return result;
  }
}

module.exports = UserRepository;

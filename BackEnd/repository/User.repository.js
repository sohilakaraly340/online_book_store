const bcrypt = require("bcrypt");
const { NotFoundError } = require("../Errors/notFoundError");
const { InternalServerError } = require("../Errors/internalServerError");

class UserRepository {
  constructor(user) {
    this.user = user;
  }

  async createUser(body) {
    const passwordHash = await bcrypt.hash(body.password, 10);
    if (!passwordHash)
      throw new InternalServerError("Error while hashed password");
    return await this.user.create({ ...body, password: passwordHash });
  }

  async findByEmail(email) {
    const user = await this.user.findOne({ email });
    return user;
  }

  async findAll() {
    const users = await this.user.find();
    if (!users) throw new NotFoundError("No users found!");
    return users;
  }

  async updateProfile(email, body) {
    const updated = await this.user.updateOne({ email }, body);

    if (!updated) throw new NotFoundError("User not found");

    return updated;
  }
}

module.exports = UserRepository;

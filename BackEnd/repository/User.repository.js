const bcrypt = require("bcrypt");

class UserRepository {
  constructor(user) {
    this.user = user;
  }
  async createUser(body) {
    try {
      const passwordHash = await bcrypt.hash(body.password, 10);
      return await this.user.create({ ...body, password: passwordHash });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findByEmail(email) {
    try {
      // console.log(await this.user.find());
      return await this.user.findOne({ email });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll() {
    try {
      return await this.user.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = UserRepository;

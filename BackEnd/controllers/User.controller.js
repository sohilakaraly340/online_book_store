const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("../validation/User.validator");
const { InternalServerError } = require("../handleErrors/internalServerError");
const { BadRequestError } = require("../handleErrors/badRequestError");
const { JWT_SECRET } = require("../constants");
const { BadRequestError } = require("../Errors/badRequestError");
const { ValidationError } = require("../Errors/validationError");

class UserController {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createNewUser(body) {
    const { error } = validator.validatUsers(body);
    if (error) {
      throw new ValidationError(`In valid data ${error.message}`);
    }

    const { email } = body;
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new BadRequestError("This email is already exist.");
    }

    return await this.userRepository.createUser(body);
  }

  async login(body) {
    const { email, password } = body;

    if (!email || !password) {
      throw new BadRequestError("Email and password are required.");
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestError("Incorrect email or password.");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new BadRequestError("Incorrect email or password.");
    }

      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1d" });
    const token = jwt.sign({ email }, "myjwtsecret", { expiresIn: "1d" });

    return { token, user };
  }

  async findAllUsers() {
    return await this.userRepository.findAll();
  }
}

module.exports = UserController;

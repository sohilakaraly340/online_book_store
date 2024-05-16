const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("../validation/User.validator");
const { InternalServerError } = require("../handleErrors/internalServerError");
const { BadRequestError } = require("../handleErrors/badRequestError");
const { JWT_SECRET } = require("../constants");

class UserController {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  handleError = (error) => {
    if (error instanceof BadRequestError)
      throw new BadRequestError(error.message);

    throw new InternalServerError(error.message);
  };

  async createNewUser(body) {
    try {
      const { error } = validator.validatUsers(body);
      if (error) {
        throw new BadRequestError(`In valid data ${error.message}`);
      }

      const { email } = body;
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        throw new BadRequestError("This email is already exist.");
      }

      return await this.userRepository.createUser(body);
    } catch (error) {
      this.handleError(error);
    }
  }

  async login(body) {
    try {
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

      return { token, user };
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAllUsers() {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      this.handleError(error);
    }
  }
}

module.exports = UserController;

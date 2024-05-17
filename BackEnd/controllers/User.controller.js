const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("../validation/User.validator");
const { JWT_SECRET } = require("../constants");
const { BadRequestError } = require("../Errors/badRequestError");
const { ValidationError } = require("../Errors/validationError");
const bycrypt = require("bcrypt");

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

    return { token, user };
  }

  async findAllUsers() {
    return await this.userRepository.findAll();
  }

  async getCurrentProfile(email) {
    return await this.userRepository.findByEmail(email);
  }

  async UpdateUserProfile(emailHeader, body) {
    const { error } = validator.validatUsers(body);
    if (error) throw new ValidationError(`In valid data ${error.message}`);
    try {
      const bodyClone = structuredClone(body);

      const { error } = validator.validatUsers(bodyClone);
      if (error) throw new BadRequestError(`In valid data ${error.message}`);

      if (body.email) throw new BadRequestError(`can't change email!`);
      if (body.password) {
        const encryptedPassword = await bycrypt.hash(body.password, 10);
        delete body.password;

        body.password = encryptedPassword;
      }
      if (bodyClone.email) throw new BadRequestError(`can't change email!`);

      let encryptedPassword;
      if (bodyClone.password) {
        encryptedPassword = await bycrypt.hash(bodyClone.password, 10);
        bodyClone.password = encryptedPassword;
      }

      return await this.userRepository.updateProfile(emailHeader, bodyClone);
    } catch (error) {
      if (error instanceof BadRequestError)
        throw new BadRequestError(error.message);

      throw new InternalServerError(error.message);
    }
  }
}

module.exports = UserController;

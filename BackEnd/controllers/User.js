const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validatUsers, validatUpdateUser, validatUpdateUserPassword } = require("../validators/User");

const { JWT_SECRET } = require("../constants");
const { BadRequestError } = require("../Errors/BadRequestError");
const { ValidationError } = require("../Errors/ValidationError");
const bycrypt = require("bcrypt");

class UserController {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createNewUser(body) {
    const { error } = validatUsers(body);
    if (error) {
      throw new ValidationError(`In valid data ${error.message}`);
    }

    const { email } = body;
    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) {
      throw new BadRequestError("This email is already exist.");
    }

    return await this.userRepository.createNewUser(body);
  }

  async login(body) {
    const { email, password } = body;

    if (!email || !password) {
      throw new BadRequestError("Email and password are required.");
    }

    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new BadRequestError("Incorrect email or password.");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new BadRequestError("Incorrect email or password.");
    }

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1d" });

    return token;
  }

  async getAllUser() {
    return await this.userRepository.getAllUser();
  }

  async getCurrentUserProfile(auth) {
    const user = auth;
    return await this.userRepository.findUserByEmail(user.email);
  }

  async UpdateUserProfile(auth, body) {
    const user = auth;
    const { error } = validatUpdateUser(body);
    if (error) throw new ValidationError(`In valid data ${error.message}`);
    const bodyClone = structuredClone(body);

    if (bodyClone.email) throw new BadRequestError(`can't change email!`);

    return await this.userRepository.updateProfile(user.email, bodyClone);
  }

  async changePassword(auth, body) {
    const user = auth;
    const bodyClone = structuredClone(body);
    const { error } = validatUpdateUserPassword(bodyClone);
    
    if (error) throw new ValidationError(`Invalid data ${error.message}`);
    
    // Validate the old password
    const isValidOldPassword = await bcrypt.compare(body.oldPassword, user.password);
    if (!isValidOldPassword) {
        throw new BadRequestError("Incorrect old password.");
    }
    
    if (bodyClone.newPassword) {
        const encryptedPassword = await bcrypt.hash(bodyClone.newPassword, 10);
        bodyClone.password = encryptedPassword;
    } else {
        throw new BadRequestError("New password is required.");
    }

    return await this.userRepository.changePassword(user.email, bodyClone);
}
}

module.exports = UserController;

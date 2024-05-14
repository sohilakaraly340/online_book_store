const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Error } = require("mongoose");
const validator=require('../validation/User.validator');

class UserController {
  constructor(userRepository) {
    this.userRepository = userRepository;
    
  }

  async createNewUser(body) {
    try {
      const { error } = validator.validatUsers(body)
      if (error) {
        return {message: error.message };
      }

      const { email } = body;
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        return "This email is already exist.";
      }

      return await this.userRepository.createUser(body);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(body) {
    try {
      const { email, password } = body;

      if (!email || !password) {
        return { message: "Email and password are required." };
      }

      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return { message: "Email and password are required." };
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return { message: "Email and password are required." };
      }

      const token = jwt.sign({ email }, "myjwtsecret", { expiresIn: "1d" });
      // res.header("Authorization", token).send({ token, user });
      return { token, user };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAllUsers() {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = UserController;

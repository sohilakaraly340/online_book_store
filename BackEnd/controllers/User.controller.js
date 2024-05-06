const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");

class UserController {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async validateUser(user) {
    const schema = joi.object({
      firstName: joi.string().min(3).max(20).required(),
      email: joi.string().min(3).max(100).required(),
      password: joi.string().min(3).max(100).required(),
    });
    return schema.validate(user);
  }

  async createNewUser(req, res) {
    try {
      const { error } = this.validateUser(req.body);
      if (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

      const { firstName, email, password } = req.body;

      // if (!firstName || !email || !password) {
      //   return res.status(400).json({
      //     success: false,
      //     message: "Name, email, and password are required fields.",
      //   });
      // }

      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "This email is already exist.",
        });
      }

      const newUser = await this.userRepository.createUser(req.body);
      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required.",
        });
      }

      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Incorrect email or password." });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res
          .status(401)
          .json({ success: false, message: "Incorrect email or password." });
      }

      const token = jwt.sign({ email }, "myjwtsecret", { expiresIn: "1d" });
      res.header("Authorization", token).send({ token, user });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async findAllUsers(req, res) {
    try {
      const allUsers = await this.userRepository.findAll();
      res.status(200).json({ success: true, data: allUsers });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = UserController;

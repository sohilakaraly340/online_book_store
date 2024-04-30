const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { validateAddUsers } = require("../validation/user.validator");
const {
  createUserService,
  findUserService,
} = require("../services/User.service");

const createNewUse = async (req, res) => {
  try {
    const { error } = validateAddUsers(req.body);
    if (error) {
      return res.status(400).send({ message: error });
    }
    console.log(req.body);

    const { firstName, email, password } = req.body;
    if (!email || !firstName) {
      return res
        .status(400)
        .send({ message: "Name and email are required fields." });
    }

    const existingUser = await findUserService(email);
    if (existingUser) {
      return res
        .status(409)
        .send({ message: "This email is already registered." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await createUserService(req.body, passwordHash);

    res.status(201).send(newUser);
  } catch (error) {
    console.error("Error creating new user:", error);
    res.status(500).send({ message: "An internal server error occurred." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required fields." });
    }

    const user = await findUserService(email);
    if (!user) {
      return res.status(401).send({ message: "Incorrect email or password." });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send({ message: "Incorrect email or password." });
    }

    const token = jwt.sign({ email }, "myjwtsecret", { expiresIn: "1d" });
    res.header("Authorization", token).send({ token, user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send({ message: "An internal server error occurred." });
  }
};
module.exports = {
  createNewUse,
  login,
};

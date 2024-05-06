const express = require("express");
const router = express.Router();
const UserController = require("../controllers/User.controller");
const UserRepository = require("../repository/User.repository");
const user = require("../models/User.schema");

const userRepository = new UserRepository(user);
const userController = new UserController(userRepository);

router.post("/", (req, res) => userController.createNewUser(req, res));
router.post("/login", (req, res) => userController.login(req, res));
router.get("/", (req, res) => userController.findAllUsers(req, res));

module.exports = router;

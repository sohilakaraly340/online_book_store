const express = require("express");
const { createNewUse, login } = require("../controllers/User.controller");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.post("/", createNewUse);
router.post("/login", login);

module.exports = router;

const express = require("express");
const {
  createNewUse,
  login,
  findAllusers,
} = require("../controllers/User.controller");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.post("/", createNewUse);
router.post("/login", login);
router.get("/", findAllusers);

module.exports = router;

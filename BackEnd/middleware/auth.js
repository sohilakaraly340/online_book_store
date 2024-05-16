const jwt = require("jsonwebtoken");
const User = require("../models/User.schema");
const auth = async (req, res, next) => {
  try {
    const token = req.headers["jwt"];
    if (!token) {
      return res.status(401).send({ message: "un authorized user" });
    }

    const payLoad = jwt.verify(token, "myjwtsecret");
    console.log(payLoad);
    const { email } = payLoad;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "un authorized user" });
    }
    req.auth = user;
    next();
  } catch (err) {
    return res.status(401).send({ message: "error" });
  }
};

module.exports = {auth};

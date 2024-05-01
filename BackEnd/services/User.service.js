const User = require("../models/User.schema");

const createUserService = async (body, passwordHash) => {
  try {
    return await User.create({ ...body, password: passwordHash });
  } catch (error) {
    console.log(error);
  }
};

const findUserService = async (email) => {
  return await User.findOne({ email });
};

const getAllUseService = async () => {
  return await User.find();
};

module.exports = {
  createUserService,
  findUserService,
  getAllUseService,
};

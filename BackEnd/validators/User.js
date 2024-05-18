const joi = require("joi");

const EmailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const phonePattern =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

const userSchema = joi.object({
  firstName: joi.string().min(3).max(20).required(),
  lastName: joi.string().min(3).max(20),
  email: joi.string().regex(EmailPattern).required(),
  phoneNumber: joi.string().regex(phonePattern).min(11).max(11),
  password: joi.string().min(8).required(),
  address: joi.string(),
  role: joi.string(),
});

const validatUsers = (user) => userSchema.validate(user);

const userUpdateSchema = joi.object({
  firstName: joi.string().min(3).max(20),
  lastName: joi.string().min(3).max(20),
  phoneNumber: joi.string().regex(phonePattern).min(11).max(11),
  image: joi.string(),
  password: joi.string().min(8),
  address: joi.string(),
});

const validatUpdateUser = (user) => userUpdateSchema.validate(user);

module.exports = { validatUpdateUser ,validatUsers };




module.exports = { validatUsers };

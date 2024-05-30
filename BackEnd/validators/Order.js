const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);

const EmailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const phonePattern =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

const orderSchema = joi.object({
  firstName: joi.string().min(3).max(20).required(),
  lastName: joi.string().min(3).max(20),
  email: joi.string().regex(EmailPattern).required(),
  status: joi
    .string()
    .valid("Pending", "Accepted", "Canceled")
    .default("Pending"),
  phoneNumber: joi.string().required().regex(phonePattern).min(11).max(11),
  address: joi.string().required().min(3),
  country: joi.string().required().min(3),
  city: joi.string().required().min(3),
});

const orderValidation = (order) => {
  return orderSchema.validate(order);
};

const updateOrderSchema = joi.object({
  status: joi
    .string()
    .valid("Pending", "Accepted", "Canceled")
    .default("Pending"),
  phoneNumber: joi.string().regex(phonePattern).min(11).max(11),
  address: joi.string().min(3),
  country: joi.string().min(3),
  city: joi.string().min(3),
});

const orderUpdateValidation = (order) => {
  return updateOrderSchema.validate(order);
};

module.exports = { orderValidation, orderUpdateValidation };

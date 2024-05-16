const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);

const phonePattern =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

const orderSchema = joi.object({
  status: joi
    .string()
    .valid("Pending", "Accepted", "Canceled")
    .default("Pending"),
  phoneNumber: joi.string().regex(phonePattern).min(11).max(11),
  address: joi.string().required().min(3),
});

const orderValidation = (order) => {
  return orderSchema.validate(order);
};

module.exports = orderValidation;

const joi = require("joi");

const eventSchema = joi.object({
  name: joi.string().min(3).max(100).required(),
  description: joi.string().min(5).required(),
  date: joi.date().required(),
  location: joi.string().required(),
});
const validateEvent = (event) => eventSchema.validate(event);

module.exports = { validateEvent };

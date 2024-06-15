const joi = require("joi");

const eventSchema = joi.object({
  name: joi.string().min(3).max(100).required(),
  description: joi.string().min(5).required(),
  numOfTickets: joi.number().min(0).required(),
  date: joi.date().required(),
  location: joi.string().required(),
  images: joi.array().items(joi.string()),
});
const validateEvent = (event) => eventSchema.validate(event);

module.exports = { validateEvent };

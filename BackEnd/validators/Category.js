const joi = require("joi");

const categorySchema = joi.object({
  title: joi.string().min(3).max(100).required(),
  description: joi.string().min(5).required(),
  images: joi.array().items(joi.string()).required(),
});
const validateCategory = (category) => categorySchema.validate(category);

module.exports = { validateCategory };

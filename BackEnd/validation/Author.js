const joi = require("joi");

const authorSchema = joi.object({
  name: joi.string().min(3).max(100).required(),
  description: joi.string().min(5).required(),
  images: joi.array().items(joi.string()).required(),
});
const validateAuthor = (author) => authorSchema.validate(author);

module.exports = { validateAuthor };

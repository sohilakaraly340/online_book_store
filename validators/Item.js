const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);

const itemSchema = joi.object({
  title: joi.string().min(3).max(100).required(),
  description: joi.string().min(5).required(),
  images: joi.array().items(joi.string()),
  countInStock: joi.number().required(),
  price: joi.number().required(),
  authorId: joi.objectId().required(),
  itemType: joi.objectId().required(),
  publicationDate: joi.string(),
  numOfPage: joi.number(),
  category: joi.objectId().required(),
  discount: joi.number(),
  duration: joi.number(),
});
const validateItem = (item) => itemSchema.validate(item);

module.exports = { validateItem };

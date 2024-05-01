const joi = require("joi");

const validateAddProduct = (user) => {
  const schema = joi.object({
    title: joi.string().min(3).max(100).required(),
    description: joi.string().min(5).required(),
    images: joi.array().items(joi.string()),
    countInStock: joi.required(),
    price: joi.number().required(),
    itemType: joi.string().required(),

    // category:joi.string().required(),
  });
  return schema.validate(user);
};

module.exports = { validateAddProduct };

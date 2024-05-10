const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);

const cartSchema = joi.object({
  item: joi.objectId().required(),
  quantity: joi.number(),
});

const cartValidation = (cart) => cartSchema.validate(cart);

module.exports = {
  cartValidation,
};

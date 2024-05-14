const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);

const shoppingItemSchema = joi.object({
  item: joi.objectId().required(),
  quantity: joi.number(),
});

const shoppingItemValidation = (shoppingItem) =>
  shoppingItemSchema.validate(shoppingItem);

module.exports = shoppingItemValidation;

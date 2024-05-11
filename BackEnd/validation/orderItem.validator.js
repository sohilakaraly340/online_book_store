const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);

const orderItemSchema = joi.object({
  item: joi.objectId().required(),
  quantity: joi.number(),
});

const orderItemValidation = (orderItem) => orderItemSchema.validate(orderItem);

module.exports = { orderItemValidation };

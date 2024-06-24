const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);
const phonePattern =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const EmailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const usedItemSchema = joi.object({
  title: joi.string().min(3).max(100).required(),
  description: joi.string().min(5),
  message: joi.string().min(5),
  images: joi.array().items(joi.string()),
  price: joi.number(),
  category: joi.objectId(),
  itemType: joi.objectId().required(),
  address: joi.string().required().min(3),
  phoneNumber: joi.string().required().regex(phonePattern).min(11).max(11),
  email: joi.string().regex(EmailPattern).required(),
});

const usedItemValidation = (usedItem) => {
  return usedItemSchema.validate(usedItem);
};

const updateUsedItemSchema = joi.object({
  title: joi.string().min(3).max(100),
  description: joi.string().min(5),
  message: joi.string().min(5),
  images: joi.array().items(joi.string()),
  price: joi.number(),
  category: joi.objectId(),
  itemType: joi.objectId(),
  address: joi.string().required().min(3),
  phoneNumber: joi.string().regex(phonePattern).min(11).max(11),
  email: joi.string().regex(EmailPattern),
});

const updateValidateUsedItem = (usedItem) => {
  return updateUsedItemSchema.validate(usedItem);
};

module.exports = { usedItemValidation, updateValidateUsedItem };

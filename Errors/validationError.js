const { BaseError } = require("./BaseError");

class ValidationError extends BaseError {
  constructor(message) {
    super(422, message);
  }
}

module.exports = { ValidationError };

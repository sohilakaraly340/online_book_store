const { BaseError } = require("./baseError");

class ValidationError extends BaseError {
  constructor(message) {
    super(404, message);
  }
}

module.exports = { ValidationError };

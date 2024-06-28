const { BaseError } = require("./BaseError");

class BadRequestError extends BaseError {
  constructor(message) {
    super(400, message);
  }
}
module.exports = { BadRequestError };

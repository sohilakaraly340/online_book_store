const { BaseError } = require("./BaseError");

class InternalServerError extends BaseError {
  constructor(message) {
    super(500, message);
  }
}
module.exports = { InternalServerError };

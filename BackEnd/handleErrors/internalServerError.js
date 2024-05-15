const { BaseError } = require("./baseError");

class InternalServerError extends BaseError {
  constructor(message) {
    super(500, message);
  }
}
module.exports = { InternalServerError };

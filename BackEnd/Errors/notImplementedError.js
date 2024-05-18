const { BaseError } = require("./BaseError");

class NotImplementedError extends BaseError {
  constructor(message) {
    super(501, message);
  }
}

module.exports = { NotImplementedError };

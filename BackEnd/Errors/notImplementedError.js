const { BaseError } = require("./baseError");

class NotImplementedError extends BaseError {
  constructor(message) {
    super(501, message);
  }
}

module.exports = { NotImplementedError };

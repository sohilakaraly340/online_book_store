const { BaseError } = require("./baseError");

class UnAuthorizedError extends BaseError {
  constructor(message) {
    super(401, message);
  }
}
module.exports = { UnAuthorizedError };

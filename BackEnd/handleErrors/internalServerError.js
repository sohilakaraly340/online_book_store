const { default: BaseError } = require("./baseError");

export default class InternalServerError extends BaseError {
  constructor(message) {
    super(500, message);
  }
}

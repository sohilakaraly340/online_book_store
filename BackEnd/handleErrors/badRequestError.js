const { default: BaseError } = require("./baseError");

export default class BadRequestError extends BaseError {
  constructor(message) {
    super(400, message);
  }
}

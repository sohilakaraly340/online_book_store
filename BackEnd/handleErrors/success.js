const { default: BaseError } = require("./baseError");

export default class success extends BaseError {
  constructor(message) {
    super(200, message);
  }
}

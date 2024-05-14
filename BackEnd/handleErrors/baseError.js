export default class BaseError {
  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

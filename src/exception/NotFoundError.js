const ClientError = require('./ClientError');

class NotFoundError extends ClientError {
  constructor(message, statusCode = 404) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = statusCode;
  }
}

module.exports = NotFoundError;

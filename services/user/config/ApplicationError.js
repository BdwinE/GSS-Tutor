class ApplicationError extends Error {
  constructor({ message, statusCode }) {
    super(message);

    this.name = 'ApplicationError';
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApplicationError;

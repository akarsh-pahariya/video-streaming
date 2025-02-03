const AppError = require('../utils/appError');

const handleDuplicateEmailDB = (err) => {
  const email = err.keyValue.email;

  const message = `A user with the email address '${email}' already exists. Please use a different email address.`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message); // Extract error messages
  const message = `Invalid input data: ${errors.join('. ')}`; // Join messages
  return new AppError(message, 400);
};

const sendErrorResponse = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const globalErrorHandler = (err, req, res, next) => {
  let error = { ...err };

  if (err.code === 11000 && err.keyPattern && err.keyPattern.email)
    error = handleDuplicateEmailDB(error);
  if (err.name === 'ValidationError') error = handleValidationErrorDB(error);

  sendErrorResponse(error, res);
};

module.exports = { globalErrorHandler };

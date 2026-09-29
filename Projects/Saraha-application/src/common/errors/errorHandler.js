const errorHandler = (error, req, res, next) => {
  console.error(error);

  if (error.isJoi) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed.',
      code: 'VALIDATION_ERROR',
      errors: error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      })),
    });
  }

  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? 'Internal server error.'
        : error.message,
    code: error.code || 'INTERNAL_SERVER_ERROR',
  });
};

export default errorHandler;
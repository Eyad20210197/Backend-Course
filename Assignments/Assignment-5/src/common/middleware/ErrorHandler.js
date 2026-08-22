export const ErrorHandler = (error, req, res, next) => {
    console.error(error);

    let status = error.statusCode ?? error.cause?.status ?? 500;

    if (error.name === "SequelizeValidationError") status = 400;
    if (error.name === "SequelizeUniqueConstraintError") status = 409;
    if (error.name === "SequelizeForeignKeyConstraintError") status = 400;

    return res.status(status).json({
        success: false,
        message: error.message || 'Internal Server Error'
    });
};

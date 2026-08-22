export const successResponse = ({
    res,
    status = 200,
    message = "Request completed successfully",
    data = null,
}) => {
    return res.status(status).json({
        success: true,
        message,
        data
    });
};

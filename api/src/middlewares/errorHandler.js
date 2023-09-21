


class ApplicationError extends Error {
    constructor(statusCode, message, data = null) {
        super(message);
        this.name = "BRMSApplicationError"
        this.statusCode = statusCode;
        this.data = data;
    }
}

exports.throwApplicationError = (statusCode, message, data = null) => {
    throw new ApplicationError(statusCode, message, data);
}

const ERROR_CODE_MAP = {
    400: "BAD_REQUEST",
    401: "UNAUTHORIZED",
    403: "FORBIDDEN",
    404: "NOT_FOUND",
    405: "METHOD_NOT_ALLOWED",
    409: "CONFLICT",
    500: "INTERNAL_SERVER_ERROR",
    503: "SERVICE_UNAVAILABLE"
}


const errorHandler = (err, req, res, next) => {
    if (err instanceof ApplicationError) {
        const errorCodeMsg = ERROR_CODE_MAP[err.statusCode] || "INTERNAL_SERVER_ERROR";
        return res.status(err.statusCode).json({
            status: errorCodeMsg,
            message: err.message,
            data: err.data
        });
    }

    return res.status(500).json({
        status: "error",
        message: err.message,
        data: null
    });
}

module.exports = errorHandler;
import dotenv from "dotenv";
import BasicConfiguration  from "../interfaces/basicConfiguration.interface";
import StatusCode  from "../interfaces/statusCode.interface";
dotenv.config();

const basicConfigurationObject :BasicConfiguration = {
    ACCESS_TOKEN_EXPIRY : process.env.ACCESS_TOKEN_EXPIRY,
    ACCESS_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET,
    CORS_ORIGIN : process.env.CORS_ORIGIN,
    MONGODB_URI : process.env.MONGODB_URI,
    PASSWORD_SECRET_KEY : process.env.PASSWORD_SECRET_KEY,
    REFRESH_TOKEN_EXPIRY : process.env.REFRESH_TOKEN_EXPIRY,
    REFRESH_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET,
};

const statusCodeObject:StatusCode = {
    HTTP_STATUS_BAD_REQUEST : 400,
    HTTP_STATUS_CREATED : 201,
    HTTP_STATUS_FORBIDDEN : 403,
    HTTP_STATUS_INTERNAL_SERVER_ERROR : 500,
    HTTP_STATUS_NOT_FOUND : 404,
    HTTP_STATUS_OK : 200,
    HTTP_STATUS_TOO_MANY_REQUESTS : 429,
    HTTP_STATUS_UNAUTHORIZED : 401,
};

const CommonErrorMessage = {
    ERROR_MESSAGE_BAD_REQUEST : "Bad Request",
    ERROR_MESSAGE_FORBIDDEN : "Forbidden",
    ERROR_MESSAGE_INTERNAL_SERVER_ERROR : "Internal Server Error",
    ERROR_MESSAGE_NOT_FOUND : "Not Found",
    ERROR_MESSAGE_TOO_MANY_REQUESTS : "Too Many Requests",
    ERROR_MESSAGE_UNAUTHORIZED : "Unauthorized",
    MESSAGE_ERROR : "Error",
    MESSAGE_SUCCESS : "Success",
};

module.exports = {basicConfigurationObject, CommonErrorMessage, statusCodeObject};
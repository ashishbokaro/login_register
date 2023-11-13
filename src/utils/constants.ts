import BasicConfiguration  from "../interfaces/basicConfiguration.interface";
import StatusCode  from "../interfaces/statusCode.interface";
import dotenv from "dotenv";
dotenv.config();

export const basicConfigurationObject :BasicConfiguration = {
    ACCESS_TOKEN_EXPIRY : process.env.ACCESS_TOKEN_EXPIRY,
    ACCESS_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET,
    CORS_ORIGIN : process.env.CORS_ORIGIN,
    MONGODB_URI : process.env.MONGODB_URI,
    PASSWORD_SECRET_KEY : process.env.PASSWORD_SECRET_KEY,
    PORT_NUMBER: process.env.PORT,
    REFRESH_TOKEN_EXPIRY : process.env.REFRESH_TOKEN_EXPIRY,
    REFRESH_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET
};

export const statusCodeObject:StatusCode = {
    HTTP_STATUS_BAD_REQUEST : 400,
    HTTP_STATUS_CREATED : 201,
    HTTP_STATUS_FORBIDDEN : 403,
    HTTP_STATUS_INTERNAL_SERVER_ERROR : 500,
    HTTP_STATUS_NOT_FOUND : 404,
    HTTP_STATUS_OK : 200,
    HTTP_STATUS_TOO_MANY_REQUESTS : 429,
    HTTP_STATUS_UNAUTHORIZED : 401,
};

export const CommonErrorMessage = {
    EMAIL_REQUIRED:"Email is Required",
    ERROR_MESSAGE_BAD_REQUEST : "Bad Request",
    ERROR_MESSAGE_FORBIDDEN : "Forbidden",
    ERROR_MESSAGE_INTERNAL_SERVER_ERROR : "Internal Server Error",
    ERROR_MESSAGE_NOT_FOUND : "Not Found",
    ERROR_MESSAGE_TOO_MANY_REQUESTS : "Too Many Requests",
    ERROR_MESSAGE_UNAUTHORIZED : "Unauthorized",
    INVALID_EMAIL:"Invalid Email",
    LOGIN_KEY_MISSING:"Login Key is Missing",
    MESSAGE_ERROR : "Error",
    MESSAGE_SUCCESS : "Success",
    PASSWORD_REQUIRED:"Password is Required",
    USERNAME_REQUIRED:"User name is required",
    USERNAME_VALIDATION_ERROR:"User name must be alphanumeric."
};
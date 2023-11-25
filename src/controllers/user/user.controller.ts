import { CommonErrorMessage, registerErrorMessage, statusCodeObject, errorAndSuccessCodeConfiguration } from "../../utils/constants";
import userService  from "../../services/user.register.service";
import fieldValidator from "../../utils/fieldValidator";
import asyncHandler from "../../utils/asyncHandler";
import User from "../../interfaces/user.interface"
import ApiResponse from "../../utils/ApiSuccess";
import { Request, Response } from "express";
import ApiError from "../../utils/ApiError";

class UserController {

    constructor() {}

    registerUser = asyncHandler(async (req: Request, res: Response) => {
        console.log("register body", req.body);
        
        try {
            const {email, password} = req.body;

            const userObj : User = {
                email,
                password,
                userRole:1
            }

            const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

            // eslint-disable-next-line no-useless-escape
            const emailRegex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

            if(fieldValidator(userObj.email) || fieldValidator(userObj.password))  throw new ApiError(statusCodeObject.HTTP_STATUS_BAD_REQUEST, errorAndSuccessCodeConfiguration.HTTP_STATUS_BAD_REQUEST, CommonErrorMessage.ERROR_FIELD_REQUIRED);
            if (!emailRegex.test(userObj.email)) throw new ApiError(statusCodeObject.HTTP_STATUS_BAD_REQUEST, errorAndSuccessCodeConfiguration.HTTP_STATUS_BAD_REQUEST, registerErrorMessage.ERROR_INVALID_EMAIL_VALIDATION);
            if (!strongRegex.test(userObj.password)) throw new ApiError(statusCodeObject.HTTP_STATUS_BAD_REQUEST, errorAndSuccessCodeConfiguration.HTTP_STATUS_BAD_REQUEST, registerErrorMessage.ERROR_PASSWORD_VALIDATION);
           
            const registerService = await userService.registerUser(userObj);

            if(fieldValidator(registerService))  throw new ApiError(statusCodeObject.HTTP_STATUS_INTERNAL_SERVER_ERROR, errorAndSuccessCodeConfiguration.HTTP_STATUS_INTERNAL_SERVER_ERROR, CommonErrorMessage.SOMETHING_WENT_WRONG);

            return res.status(201).json(
                new ApiResponse(statusCodeObject.HTTP_STATUS_OK, errorAndSuccessCodeConfiguration.HTTP_STATUS_OK, registerService.email, registerErrorMessage.SUCCESSFULLY_SAVED)
            )
        } catch (error) {
           
            if (error instanceof ApiError) {
                // Handle ApiError instances with dynamic status code and message
                return res.status(error.statusCode).json({
                    error: error || CommonErrorMessage.SOMETHING_WENT_WRONG,
                });
            } else {
                // Handle other types of errors
                console.error("Error in registerUser:", error);

                return res.status(statusCodeObject.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ error: CommonErrorMessage.SOMETHING_WENT_WRONG });
            }
           
        }
    });
}
const userController = new UserController()

export default  userController;

import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import userService  from "../../services/user.register.service";
import User from "../../interfaces/user.interface"
import fieldValidator from "../../utils/fieldValidator";
import ApiError from "../../utils/ApiError";
import { CommonErrorMessage, registerErrorMessage, statusCodeObject } from "../../utils/constants";

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

            if(fieldValidator(userObj.email) || fieldValidator(userObj.password))  throw new ApiError(statusCodeObject.HTTP_STATUS_BAD_REQUEST, CommonErrorMessage.ERROR_FIELD_REQUIRED);
            if (!emailRegex.test(userObj.email)) throw new ApiError(statusCodeObject.HTTP_STATUS_BAD_REQUEST, registerErrorMessage.ERROR_INVALID_EMAIL_VALIDATION);
            if (!strongRegex.test(userObj.password)) throw new ApiError(statusCodeObject.HTTP_STATUS_BAD_REQUEST, registerErrorMessage.ERROR_PASSWORD_VALIDATION);
           
            const registerService = await userService.registerUser(userObj);

            if(fieldValidator(registerService))  throw new ApiError(statusCodeObject.HTTP_STATUS_BAD_REQUEST, CommonErrorMessage.SOMETHING_WENT_WRONG);

            res.status(200).send("OK");
        } catch (error) {
           
            console.error("Error in registerUser:", error);
            res.status(400).json({ error: "Some thing went wrong" });
           
        }
    });
}
const userController = new UserController()

export default  userController;

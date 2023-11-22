// services/UserService.ts
import UserModel from "../models/user.model";
import User from "../interfaces/user.interface"
import fieldValidator from "../utils/fieldValidator"
import {CommonErrorMessage, registerErrorMessage} from "../utils/constants";
import ApiError from "../utils/ApiError";

class UserService {
    constructor() {}
    async registerUser(userObj:User):Promise<User> {
        try {
            const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

            // eslint-disable-next-line no-useless-escape
            const emailRegex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

            if(fieldValidator(userObj.email) || fieldValidator(userObj.password))  throw new ApiError(400, CommonErrorMessage.ERROR_FIELD_REQUIRED);
            if (!emailRegex.test(userObj.email)) throw new ApiError(400, registerErrorMessage.ERROR_INVALID_EMAIL_VALIDATION);
            if (!strongRegex.test(userObj.password)) throw new ApiError(400, registerErrorMessage.ERROR_PASSWORD_VALIDATION);
           
            const user =  await UserModel.findOne({email:userObj.email})

            if(!fieldValidator(user)) throw new ApiError(400, registerErrorMessage.ERROR_USER_ALREADY_EXIST);

            return user;
            
        } catch (error) {
            return error
        }

    }
}
const userService = new UserService();

export default userService;

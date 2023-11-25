// services/UserService.ts
import UserModel from "../models/user.model";
import User from "../interfaces/user.interface"
import fieldValidator from "../utils/fieldValidator"
import {registerErrorMessage, statusCodeObject} from "../utils/constants";
import ApiError from "../utils/ApiError";

class UserService {
    constructor() {}
    async registerUser(userObj:User):Promise<User> {
        try {
            
            const user =  await UserModel.findOne({email:userObj.email});

            if(!fieldValidator(user)) throw new ApiError(statusCodeObject.HTTP_STATUS_CONFLICT, registerErrorMessage.ERROR_USER_ALREADY_EXIST);
            const saveUser = await UserModel.create({
                accountBlocked:false, 
                email:userObj.email,
                password:userObj.password,
                userRole:userObj.userRole
            });

            return saveUser;
            
        } catch (error) {
            console.error("Error in registerUser:", error);
            throw error
        }

    }
}
const userService = new UserService();

export default userService;
import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import userService  from "../../services/user.register.service"
class UserController {

    constructor() {}

    registerUser = asyncHandler(async (req: Request, res: Response) => {
        console.log("register body", req.body);
        
        try {
            const {email, password} = req.body;

            const dataObj = {
                email,
                password
            }

            const registerService = await userService.registerUser(dataObj)

            res.status(200).send("OK");
        } catch (error) {
           
            console.error("Error in registerUser:", error);
            res.status(400).json({ error: "Some thing went wrong" });
           
        }
    });
}
const userController = new UserController()

export default  userController;

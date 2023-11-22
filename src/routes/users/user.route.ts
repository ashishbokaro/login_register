import {Router} from "express";

const router = Router()

import userController from "../../controllers/user/user.controller";

router.route("/register").post(userController.registerUser)
export default router;
import express from "express"
import { loginUser, registerUser, listUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);

userRouter.post("/register", registerUser);

userRouter.get("/getUser", listUser);

export default userRouter;
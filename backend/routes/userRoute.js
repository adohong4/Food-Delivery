import express from "express"
import { loginUser, registerUser, listUser, getUserById, updateUserById } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);

userRouter.post("/register", registerUser);

userRouter.get("/getUser", listUser);

userRouter.get("/getUser/:id", getUserById);

userRouter.put("/updateUser/:id", updateUserById);

export default userRouter;
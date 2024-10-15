import express from "express"
import {
    loginUser, registerUser, listUser,
    getUserById, getUserByName, updateUserById,
    deleteUserById, paginateUser
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);

userRouter.post("/register", registerUser);

userRouter.get("/getUser", listUser);

userRouter.get("/getUser/:id", getUserById);

userRouter.put("/updateUser/:id", updateUserById);

userRouter.get("/getUserName/:name", getUserByName);

userRouter.post("/deleteUser/", deleteUserById);

userRouter.get("/users", paginateUser);


export default userRouter;
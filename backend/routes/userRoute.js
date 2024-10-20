import express from "express"
import authMiddleware from "../middleware/auth.js"
import {
    loginUser, registerUser, listUser,
    getUserById, getUserByName, updateUserById,
    deleteUserById, paginateUser, checkToken, addUserAddress, getAllUserAddresses
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);

userRouter.post("/register", registerUser);

userRouter.get("/getUser", listUser);

userRouter.get("/getUser/:id", getUserById);

userRouter.put("/updateUser/:id", updateUserById);

userRouter.get("/getUserName", getUserByName);

userRouter.post("/deleteUser/", deleteUserById);

userRouter.get("/users", paginateUser);

userRouter.get("/checkToken", checkToken);

userRouter.post("/addUserAddress", authMiddleware, addUserAddress)

userRouter.get("/getAllUserAddresses", authMiddleware, getAllUserAddresses);


export default userRouter;
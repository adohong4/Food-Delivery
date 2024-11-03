import express from "express"
import {
    loginUser, registerUser, listUser, getUserInfo,
    getUserById, getUserByName, updateUserById, updateInformation,
    deleteUserById, checkToken, addUserAddress, getAllUserAddresses
} from "../controllers/userController.js";
import multer from "multer"
import authMiddleware from "../middleware/auth.js"

const userRouter = express.Router();

//image Storage Engine
const storage = multer.diskStorage({
    destination: "upProfile",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

userRouter.put("/addInfo", upload.single("image"), authMiddleware, updateInformation);
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.get("/profile", authMiddleware, getUserInfo)
userRouter.get("/getUser", listUser);
userRouter.get("/getUser/:id", getUserById);
userRouter.put("/updateUser/:id", updateUserById);
userRouter.get("/getUserName", getUserByName);
userRouter.post("/deleteUser/", deleteUserById);
userRouter.get("/checkToken", checkToken);
userRouter.post("/addUserAddress", authMiddleware, addUserAddress)
userRouter.get("/getAllUserAddresses", authMiddleware, getAllUserAddresses);




export default userRouter;
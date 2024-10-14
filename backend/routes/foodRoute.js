import express from "express";
import { addFood, listFood, removeFood, updateFood } from "../controllers/foodController.js";

import multer from "multer"


const foodRouter = express.Router();

//image Storage Engine

const storage = multer.diskStorage({
    destination: "upload",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage: storage })
// upload.single("image"),
// end points
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);
foodRouter.put("/update/:id", upload.single("image"), updateFood);



export default foodRouter;

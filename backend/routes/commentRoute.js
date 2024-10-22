import express from 'express';
import { addComment, getAllComments } from '../controllers/commentController.js';
import authMiddleware from "../middleware/auth.js"

const commentRouter = express.Router();

commentRouter.post("/addComment", authMiddleware, addComment);
commentRouter.get("/getAllComments", getAllComments);

export default commentRouter;

import express from 'express';
import { addComment, getAllComments, deleteComment, getTopComments } from '../controllers/commentController.js';
import authMiddleware from "../middleware/auth.js"

const commentRouter = express.Router();

commentRouter.post("/addComment", authMiddleware, addComment);
commentRouter.get("/getAllComments", getAllComments);
commentRouter.post("/deleteComment", deleteComment);
commentRouter.get("/topComment", getTopComments)

export default commentRouter;

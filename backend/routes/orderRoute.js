import express from "express"
import authMiddleware from "../middleware/auth.js"
import { listOrders, placeOrder, userOrder, verifyOrder, updateStatus, paginateOrder } from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrder);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus)
orderRouter.get("/lists", paginateOrder);

export default orderRouter;
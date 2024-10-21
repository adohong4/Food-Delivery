import express from 'express';
import {
    statistical, totalPayment, getTodayPayment
} from "../controllers/statisticalController.js";

const statisticalRouter = express.Router();

statisticalRouter.get("/all", statistical);
statisticalRouter.get("/totalPayment", totalPayment);
statisticalRouter.get("/todayPayment", getTodayPayment);

export default statisticalRouter;

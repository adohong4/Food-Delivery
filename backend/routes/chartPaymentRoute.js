import express from 'express';
import { getPayments } from '../controllers/chartPaymentController.js'

const chartPaymentRouter = express.Router();

chartPaymentRouter.get("/payment", getPayments)

export default chartPaymentRouter;
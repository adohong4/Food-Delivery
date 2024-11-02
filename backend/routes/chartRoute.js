import express from 'express';
import { getPayments, getUserStatistics } from '../controllers/chartPaymentController.js'

const chartRouter = express.Router();

chartRouter.get("/payment", getPayments)
chartRouter.get("/getUser", getUserStatistics)

export default chartRouter;
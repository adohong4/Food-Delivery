import express from 'express';
import { getPaymentsByDay, getPaymentsByWeek, getPaymentsByMonth, getPaymentsByYear } from '../controllers/chartPaymentController.js'

const chartPaymentRouter = express.Router();

chartPaymentRouter.get("/dayPayment", getPaymentsByDay)
chartPaymentRouter.get("/weekPayment", getPaymentsByWeek)
chartPaymentRouter.get("/monthPayment", getPaymentsByMonth)
chartPaymentRouter.get("/yearPayment", getPaymentsByYear)

export default chartPaymentRouter;
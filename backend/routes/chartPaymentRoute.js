import express from 'express';
import { getPaymentsByDay, getPaymentsByWeek, getPaymentsByMonth, getPaymentsByYear } from '../controllers/chartPaymentController.js'

const chartRouter = express.Router();

chartRouter.get("/dayPayment", getPaymentsByDay)
chartRouter.get("/weekPayment", getPaymentsByWeek)
chartRouter.get("/monthPayment", getPaymentsByMonth)
chartRouter.get("/yearPayment", getPaymentsByYear)

export default chartRouter;
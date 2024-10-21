import express from 'express';
import {
    getTopFoodSelected, paginateFood, paginateOrder, paginateUser
} from "../controllers/tableController.js";

const tableRouter = express.Router();

tableRouter.get("/all", getTopFoodSelected);
tableRouter.get("/users", paginateUser);
tableRouter.get("/foods", paginateFood);
tableRouter.get("/orders", paginateOrder);

export default tableRouter;
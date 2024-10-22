import express from 'express';
import {
    getTopFoodSelected, paginateFood, paginateOrder, paginateUser,
    paginateComments
} from "../controllers/tableController.js";

const tableRouter = express.Router();

tableRouter.get("/all", getTopFoodSelected);
tableRouter.get("/users", paginateUser);
tableRouter.get("/foods", paginateFood);
tableRouter.get("/orders", paginateOrder);
tableRouter.get("/comment", paginateComments);

export default tableRouter;
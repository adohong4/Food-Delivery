import orderModel from "../models/orderModel.js";
import foodModel from "../models/foodModel.js";
import userModel from "../models/userModel.js";
import commentModel from "../models/commentModel.js";
import mongoose from 'mongoose';

const getTopFoodSelected = async (req, res) => {
    try {
        const orders = await orderModel.find();
        const foodCount = {};

        // Count food in each order
        orders.forEach(order => {
            order.items.forEach(item => {
                const foodId = item._id; // get id food in order
                const quantity = item.quantity || 1;

                if (foodId) {  //check foodId is valid
                    if (foodCount[foodId]) {
                        foodCount[foodId] += quantity;
                    } else {
                        foodCount[foodId] = quantity;
                    }
                }
            });
        });

        // change object to array and sort
        const sortedFoods = Object.keys(foodCount)
            .map(foodId => ({ foodId, count: foodCount[foodId] }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);

        // what is FoodId checking valid?
        const foodIds = sortedFoods.map(food => food.foodId).filter(id => mongoose.Types.ObjectId.isValid(id));

        if (foodIds.length === 0) {
            return res.status(404).json({ message: "No valid food IDs found." });
        }

        const topFoods = await foodModel.find({ _id: { $in: foodIds } });

        const result = topFoods.map(food => {
            const count = sortedFoods.find(item => item.foodId.toString() === food._id.toString()).count;
            return { ...food._doc, count };
        });

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//paginate list food
const paginateFood = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const startIndex = (page - 1) * limit;

    try {
        // Sort by lastest time and paginate
        const orders = await foodModel.find().limit(limit).skip(startIndex);
        const totalFoods = await foodModel.countDocuments();
        const totalPages = Math.ceil(totalFoods / limit);

        res.json({
            success: true,
            data: orders,
            page,
            totalPages,
            totalFoods
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
}

//paginate list order
const paginateOrder = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    try {
        // Sort by lastest time and paginate
        const orders = await orderModel.find().sort({ createdAt: -1 }).limit(limit).skip(startIndex);
        const totalOrders = await orderModel.countDocuments();
        const totalPages = Math.ceil(totalOrders / limit);

        res.json({
            success: true,
            data: orders,
            page,
            totalPages,
            totalOrders
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
}

//paginate user
const paginateUser = async (req, res) => {
    const page = parseInt(req.query.page) || 1; //current page display
    const limit = parseInt(req.query.limit) || 20; // amount users of page
    const startIndex = (page - 1) * limit;

    try {
        const users = await userModel.find().limit(limit).skip(startIndex);
        const totalUsers = await userModel.countDocuments();
        const totalPages = Math.ceil(totalUsers / limit);

        res.json({
            success: true,
            data: users,
            page,
            totalPages,
            totalUsers
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
}

//paginate comment
const paginateComments = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // current page
    const limit = parseInt(req.query.limit) || 10; // number of comments per page
    const startIndex = (page - 1) * limit;

    try {
        const comments = await commentModel.find()
            .populate({ path: 'userId', select: 'email' })
            .populate({ path: 'orderId', select: '_id' })
            .select('rating comment orderId userId')
            .sort({ createdAt: -1 })
            .skip(startIndex)
            .limit(limit);

        const totalComments = await commentModel.countDocuments();
        const totalPages = Math.ceil(totalComments / limit);

        res.json({
            success: true,
            data: comments.map(comment => ({
                rating: comment.rating,
                comment: comment.comment,
                orderId: comment.orderId ? comment.orderId._id : null,
                email: comment.userId ? comment.userId.email : null
            })),
            page,
            totalPages,
            totalComments
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};



export { getTopFoodSelected, paginateUser, paginateFood, paginateOrder, paginateComments };
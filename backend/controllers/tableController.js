import orderModel from "../models/orderModel.js";
import foodModel from "../models/foodModel.js";
import userModel from "../models/userModel.js";

const getTopFoodSelected = async (req, res) => {
    try {
        const topFoods = await orderModel.aggregate([
            { $unwind: "$items" }, // Tách từng item trong đơn hàng ra
            {
                $group: {
                    _id: "$items._id", // Nhóm theo id của món ăn
                    totalQuantity: { $sum: "$items.quantity" }
                }
            },
            { $sort: { totalQuantity: -1 } }, // Sắp xếp theo tổng số lượng giảm dần
            { $limit: 10 }, // Giới hạn kết quả top 10 món ăn
            {
                $lookup: {
                    from: "foods", // Tên collection chứa món ăn
                    localField: "_id",
                    foreignField: "_id",
                    as: "foodDetails"
                }
            },
            { $unwind: "$foodDetails" }, // Tách từng chi tiết món ăn ra
            {
                $project: {
                    _id: 1,
                    totalQuantity: 1,
                    "foodDetails.name": 1,
                    "foodDetails.description": 1,
                    "foodDetails.price": 1,
                    "foodDetails.image": 1,
                    "foodDetails.category": 1
                }
            }
        ]);

        res.json({ success: true, data: topFoods });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
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

export { getTopFoodSelected, paginateUser, paginateFood, paginateOrder };
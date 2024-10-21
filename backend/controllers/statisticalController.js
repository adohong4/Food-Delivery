import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import foodModel from "../models/foodModel.js";

const statistical = async (req, res) => {
    try {
        const totalUsers = await userModel.countDocuments();

        const totalOrders = await orderModel.countDocuments();

        const totalFoods = await foodModel.countDocuments();

        const ordersByStatus = await orderModel.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        res.json({
            success: true,
            data: {
                totalUsers,
                totalFoods,
                totalOrders,
                ordersByStatus
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

//total payment
const totalPayment = async (req, res) => {
    try {
        const result = await orderModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalPayment: { $sum: "$amount" }
                }
            }
        ]);

        const totalPayment = result.length > 0 ? result[0].totalPayment : 0;

        res.json({ success: true, totalPayment })

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

const getTodayPayment = async (req, res) => {
    try {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59, 999);

        const result = await orderModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: start, $lte: end }
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$amount" }
                }
            }
        ]);

        const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;

        res.json({ success: true, totalRevenue });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export { statistical, totalPayment, getTodayPayment };

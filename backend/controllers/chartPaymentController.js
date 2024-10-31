import orderModel from "../models/orderModel.js";

// Helper function to get ISO week number
const getISOWeek = (date) => {
    const firstJanuary = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - firstJanuary) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + firstJanuary.getDay() + 1) / 7);
};

// Function to format payments data
const formatPaymentsData = (payments, unit) => {
    const today = new Date();
    let result = [];

    switch (unit) {
        case "day":
            result = Array.from({ length: 8 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - (7 - i));
                const day = date.getDate();
                const month = date.getMonth() + 1; // January is 0
                const year = date.getFullYear();
                const payment = payments.find(p => p._id.day === day && p._id.month === month && p._id.year === year);
                return {
                    date: `${day}/${month}/${year}`,
                    totalAmount: payment ? payment.totalAmount : 0
                };
            });
            break;
        case "week":
            result = Array.from({ length: 8 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - ((7 - i) * 7));
                const week = getISOWeek(date);
                const year = date.getFullYear();
                const payment = payments.find(p => p._id.week === week && p._id.year === year);
                return {
                    week: week,
                    year: year,
                    totalAmount: payment ? payment.totalAmount : 0
                };
            });
            break;
        case "month":
            result = Array.from({ length: 8 }, (_, i) => {
                const month = new Date();
                month.setMonth(month.getMonth() - (7 - i));
                const year = month.getFullYear();
                const monthIndex = month.getMonth() + 1; // Months from 1 to 12
                const payment = payments.find(p => p._id.month === monthIndex && p._id.year === year);
                return {
                    month: monthIndex,
                    year: year,
                    totalAmount: payment ? payment.totalAmount : 0
                };
            });
            break;
        case "year":
            result = Array.from({ length: 5 }, (_, i) => {
                const year = today.getFullYear() - (4 - i);
                const payment = payments.find(p => p._id.year === year);
                return {
                    year: year,
                    totalAmount: payment ? payment.totalAmount : 0
                };
            });
            break;
        default:
            break;
    }

    return result;
};


const getPayments = async (req, res) => {
    const { period } = req.query;

    try {
        const today = new Date();
        let pastDate;
        let groupId;
        let formatUnit;

        switch (period) {
            case "day":
                pastDate = new Date(today);
                pastDate.setDate(today.getDate() - 7);
                groupId = { day: { $dayOfMonth: "$createdAt" }, month: { $month: "$createdAt" }, year: { $year: "$createdAt" } };
                formatUnit = "day";
                break;
            case "week":
                pastDate = new Date(today);
                pastDate.setDate(today.getDate() - 7 * 8);
                groupId = { week: { $week: "$createdAt" }, year: { $year: "$createdAt" } };
                formatUnit = "week";
                break;
            case "month":
                pastDate = new Date(today);
                pastDate.setMonth(today.getMonth() - 8);
                groupId = { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } };
                formatUnit = "month";
                break;
            case "year":
                pastDate = new Date(today);
                pastDate.setFullYear(today.getFullYear() - 5);
                groupId = { year: { $year: "$createdAt" } };
                formatUnit = "year";
                break;
            default:
                return res.status(400).json({ success: false, message: "Invalid period" });
        }

        const payments = await orderModel.aggregate([
            { $match: { createdAt: { $gte: pastDate, $lte: today } } },
            { $group: { _id: groupId, totalAmount: { $sum: "$amount" } } },
            { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1, "_id.week": 1 } }
        ]);

        const result = formatPaymentsData(payments, formatUnit);
        res.json({ success: true, payments: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export { getPayments };

import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import foodModel from "../models/foodModel.js";

const getISOWeek = (date) => {
    const firstJanuary = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - firstJanuary) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + firstJanuary.getDay() + 1) / 7);
};

//display the last 8 days
const getPaymentsByDay = async (req, res) => {
    try {
        const today = new Date();
        const eightDaysAgo = new Date(today);
        eightDaysAgo.setDate(today.getDate() - 7);

        const payments = await orderModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: eightDaysAgo, $lte: today }
                }
            },
            {
                $group: {
                    _id: {
                        day: { $dayOfMonth: "$createdAt" },
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" }
                    },
                    totalAmount: { $sum: "$amount" }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
        ]);

        // create an array of result for last 8 days
        const result = Array.from({ length: 8 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const day = date.getDate();
            const month = date.getMonth() + 1; // from January to December
            const year = date.getFullYear();

            const payment = payments.find(p => p._id.day === day && p._id.month === month && p._id.year === year);
            return {
                date: `${day}/${month}/${year}`,
                totalAmount: payment ? payment.totalAmount : 0
            };
        });

        res.json({ success: true, payments: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

//display the last 8 weeks
const getPaymentsByWeek = async (req, res) => {
    try {
        const today = new Date();
        const eightWeeksAgo = new Date(today);
        eightWeeksAgo.setDate(today.getDate() - 7 * 8);

        const payments = await orderModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: eightWeeksAgo, $lte: today }
                }
            },
            {
                $group: {
                    _id: {
                        week: { $week: "$createdAt" },
                        year: { $year: "$createdAt" }
                    },
                    totalAmount: { $sum: "$amount" }
                }
            },
            { $sort: { "_id.year": 1, "_id.week": 1 } }
        ]);

        // create an array of result for last 8 weeks
        const result = Array.from({ length: 8 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (i * 7));
            const week = getISOWeek(date); // funtion get ISO week
            const year = date.getFullYear();

            const payment = payments.find(p => p._id.week === week && p._id.year === year);
            return {
                week: week,
                year: year,
                totalAmount: payment ? payment.totalAmount : 0
            };
        });

        res.json({ success: true, payments: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// display the last 8 months
const getPaymentsByMonth = async (req, res) => {
    try {
        const today = new Date();
        const eightMonthsAgo = new Date(today);
        eightMonthsAgo.setMonth(today.getMonth() - 8);

        const payments = await orderModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: eightMonthsAgo, $lte: today }
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" }
                    },
                    totalAmount: { $sum: "$amount" }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        // create an array of result for last 8 months
        const result = Array.from({ length: 8 }, (_, i) => {
            const month = new Date();
            month.setMonth(month.getMonth() - i);
            const year = month.getFullYear();
            const monthIndex = month.getMonth() + 1; // Tháng từ 1 đến 12

            const payment = payments.find(p => p._id.month === monthIndex && p._id.year === year);
            return {
                month: monthIndex,
                year: year,
                totalAmount: payment ? payment.totalAmount : 0
            };
        });

        res.json({ success: true, payments: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// display the last 5 years
const getPaymentsByYear = async (req, res) => {
    try {
        const today = new Date();
        const fiveYearsAgo = new Date(today);
        fiveYearsAgo.setFullYear(today.getFullYear() - 5);

        const payments = await orderModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: fiveYearsAgo, $lte: today }
                }
            },
            {
                $group: {
                    _id: { year: { $year: "$createdAt" } },
                    totalAmount: { $sum: "$amount" }
                }
            },
            { $sort: { "_id.year": 1 } }
        ]);

        // create an array of result for last 5 days
        const result = Array.from({ length: 5 }, (_, i) => {
            const year = today.getFullYear() - i;
            const payment = payments.find(p => p._id.year === year);
            return {
                year: year,
                totalAmount: payment ? payment.totalAmount : 0
            };
        });

        res.json({ success: true, payments: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};



export { getPaymentsByDay, getPaymentsByWeek, getPaymentsByMonth, getPaymentsByYear };

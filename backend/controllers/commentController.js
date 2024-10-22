import commentModel from "../models/commentModel.js";
import orderModel from "../models/orderModel.js";

const getAllComments = async (req, res) => {
    try {
        const comments = await commentModel.find().populate('userId').populate('orderId');
        res.json({ success: true, data: comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const addComment = async (req, res) => {
    try {
        const { orderId, rating, comment } = req.body;
        const userId = req.body.userId; // Lấy userId từ middleware

        // Kiểm tra xem đơn hàng có tồn tại không
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found.' });
        }

        // Kiểm tra trạng thái đơn hàng
        if (order.status !== 'Delivered') {
            console.log(order.status)
            return res.status(400).json({ success: false, message: 'You can only comment on delivered orders.' });
        }

        // Kiểm tra xem bình luận đã tồn tại chưa
        const existingComment = await commentModel.findOne({ orderId: orderId });
        if (existingComment) {
            return res.status(400).json({ success: false, message: 'You have already commented on this order.' });
        }

        // Tạo bình luận mới
        const newComment = new commentModel({
            orderId,
            userId,
            rating,
            comment,
        });

        await newComment.save();

        return res.status(201).json({ success: true, message: 'Comment added successfully!' });
    } catch (error) {
        console.error("Error adding comment", error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

const deleteComment = async (req, res) => {
    try {
        const comment = await commentModel.findByIdAndDelete(req.body.id);
        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }
        res.json({ success: true, message: "Comment Removed" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

const getTopComments = async (req, res) => {
    try {
        const comments = await commentModel.find({ rating: { $gte: 4 } })
            .populate({ path: 'userId', select: 'email' })
            .populate({ path: 'orderId', select: '_id' })
            .select('rating comment orderId userId')
            .sort({ rating: -1 })
            .limit(5);

        res.json({
            success: true,
            data: comments.map(comment => ({
                rating: comment.rating,
                comment: comment.comment,
                orderId: comment.orderId ? comment.orderId._id : null,
                email: comment.userId ? comment.userId.email : null
            }))
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};




export { getAllComments, addComment, deleteComment, getTopComments };


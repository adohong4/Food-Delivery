import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'orders', required: true, unique: true }, // Đảm bảo mỗi order chỉ có 1 comment
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const commentModel = mongoose.models.comments || mongoose.model("comments", commentSchema);

export default commentModel;

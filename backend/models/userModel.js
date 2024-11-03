import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true }
})

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    addresses: [AddressSchema],
    cartData: { type: Object, default: {} }
}, { minimize: false, timestamps: true })

const userModel = mongoose.models.user || mongoose.model("users", UserSchema)

export default userModel;


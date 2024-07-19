import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://adohong4:25032003@cluster0.stutyen.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
        dbName: 'Food-delivery'
    }).then(() => console.log("DB connected"))
        .catch(error => console.log(error))

}
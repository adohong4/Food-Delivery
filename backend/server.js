import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config.js'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import statisticalRouter from "./routes/statisticalRoute.js";
import chartPaymentRouter from "./routes/chartPaymentRoute.js";
import tableRouter from "./routes/tableRoute.js";
import commentRouter from "./routes/commentRoute.js";

// app config
const app = express();
const port = process.env.PORT

// middleware
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("API Working")
})

//api endpoints;
app.use("/api/food", foodRouter)
app.use("/images", express.static('upload'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)
app.use("/api/statistical", statisticalRouter)
app.use("/api/chart", chartPaymentRouter)
app.use("/api/table", tableRouter)
app.use("/api/comment", commentRouter)
// db connection
connectDB();

app.listen(port, () => {
    console.log(`Server Start on http://localhost:${port}`)
})
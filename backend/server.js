import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";



// app config
const app = express();
const port = 4001

// middleware
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("API Working")
})

//api enpoints;
app.use("/api/food", foodRouter)
app.use("/images", express.static('upload'))


// db connection
connectDB();

app.listen(port, () => {
    console.log(`Server Start on http://localhost:${port}`)
})
import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import morgan from "morgan"
import authRoute from "./routes/authRoute.js"
import cors from "cors"
import courceRoute from "./routes/courceRoute.js"

dotenv.config()

connectDB();

const app=express();

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


//routes
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/cource',courceRoute)


const PORT=process.env.PORT || 8080
app.listen(8080,(req,res)=>{
    console.log(`Server is running on ${PORT}`.bgCyan.white)
})
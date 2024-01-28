import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import cors from 'cors'
import connectDB from './config/connectdb.js'
import userRoute from './routes/userRoutes.js'
const app = express();
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
app.use(cors()) //cors policy
connectDB(DATABASE_URL)//Database connection
app.use(express.json())//Json

//Load Route
app.use('/apiv1/user',userRoute)

app.listen(port,()=>{
    console.log(`server listening at http://localhost:${port}`)
})
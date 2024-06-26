import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose"
import userRoutes from "./routes/user"
import authRoutes from "./routes/auth"
import cookieParser from "cookie-parser"


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(process.env.FRONTEND_URL)
app.use(
     cors(
{
        origin: process.env.FRONTEND_URL as string,
        credentials: true,
        optionsSuccessStatus: 200
}
)      
);

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)



;(async () => {
    await mongoose.connect(process.env.MONGO_URL as string)
    // await mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)
 .then(  () =>{
    app.listen(8000, () => {
        console.log("DB IS CONNECTED  TO ( E2E )SUCSESSFULLY " );
        console.log("Server is running on port 8000");
    });
 })
 })();


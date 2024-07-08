import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose"
import userRoutes from "./routes/user"
import authRoutes from "./routes/auth"
import myHotelRoutes from "./routes/my-hotels"
import cookieParser from "cookie-parser"
import { v2 as cloudinary} from "cloudinary";
import path from "path"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRETE,
})

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(process.env.FRONTEND_URL)
app.use(
     cors({
        origin: process.env.FRONTEND_URL as string,
        credentials: true,
        optionsSuccessStatus: 200
})      
);

app.use(express.static(path.join(__dirname, "../../CLIENT/dist")))


app.use("/api/auth", authRoutes)

// http://localhost:8000/api/auth/login
// http://localhost:8000/api/auth/validate-token
// http://localhost:8000/api/auth/logout


app.use("/api/users", userRoutes)

// http://localhost:8000/api/users/register

app.use("/api/my-hotels", myHotelRoutes)

// http://localhost:8000/api/my-hotels/



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


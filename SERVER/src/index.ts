import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose"
import userRoutes from "./routes/user"
import authRoutes from "./routes/auth"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

// app.get("/api/test", async (req: Request, res: Response) => {
//     res.json({ message: "Hello, I am trying backend" });
// });

;(async () => {
    await mongoose.connect(process.env.MONGO_URL as string)
 .then(  () =>{
    app.listen(8000, () => {
        console.log("DB IS CONNECTED SUCSESSFULLY ");
        console.log("Server is running on port 8000");
    });
 })
 })();


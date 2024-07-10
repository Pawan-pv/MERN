import cors from "cors";
import express,
 { Request, Response } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import myHotelRoutes from "./routes/my-hotels";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import path from "path";

  cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRETE,
  });
  
  const app = express();
  const PORT = process.env.PORT || 8000;
  
  // Middleware setup
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  console.log("Frontend URL:", process.env.FRONTEND_URL);
  
  app.use(
      cors({
          origin: process.env.FRONTEND_URL,
          credentials: true,
          optionsSuccessStatus: 200,
      })
  );
  
  app.use(express.static(path.join(__dirname, "../../CLIENT/dist")));
  
  // Routes setup
  app.use("/api/auth", authRoutes);
  // Example routes:
  // http://localhost:8000/api/auth/login
  // http://localhost:8000/api/auth/validate-token
  // http://localhost:8000/api/auth/logout
  
  app.use("/api/users", userRoutes);
  // Example route:
  // http://localhost:8000/api/users/register
  
  app.use("/api/my-hotels", myHotelRoutes);
  // Example route:
  // http://localhost:8000/api/my-hotels/
  
  // Database connection and server startup
  (async () => {
      try {
          await mongoose.connect(process.env.MONGO_URL as string);
          console.log("DB is connected successfully");
          
          app.listen(PORT, () => {
              console.log(`Server is running on port ${PORT}`);
          });
      } catch (error) {
          console.error("DB connection failed:", error);
          process.exit(1); // Exit process with failure
      }
  })();
  
  // Cloudinary configuration
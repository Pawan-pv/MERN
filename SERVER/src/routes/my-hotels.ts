      
      import express, { Request, Response } from "express";
      import multer from "multer";
      import { v2 as cloudinary } from "cloudinary";
      import Hotel from "../models/hotel";
      import verifyToken from "../middleware/auth";
      import { body, validationResult } from "express-validator";
      
      const router = express.Router();
      
      const storage = multer.memoryStorage();
      const upload = multer({
          storage: storage,
          limits: {
              fileSize: 5 * 1024 * 1024 // 5MB
          }
      });
      
      // api/my-hotels
      router.post("/",
          verifyToken,
          [
              body("name").notEmpty().withMessage("Name is required"),
              body("city").notEmpty().withMessage("City is required"),
              body("country").notEmpty().withMessage("Country is required"),
              body("description").notEmpty().withMessage("Description is required"),
              body("type").notEmpty().withMessage("Hotel type is required"),
              body("pricePerNight").isNumeric().withMessage("Price per night must be a number"),
              body("facilities").isArray().withMessage("Facilities must be an array"),
              body("starRating").isNumeric().withMessage("Star rating must be a number"),
          ],
          upload.array("imageFiles", 6),
          async (req: Request, res: Response) => {
              console.log("Received request to add a new hotel");
      
              // Check for validation errors
              const errors = validationResult(req);
              if (!errors.isEmpty()) {
                  console.log("Validation errors:", errors.array());
                  return res.status(400).json({ errors: errors.array() });
              }
      
              try {
                  const imageFiles = req.files as Express.Multer.File[];
                  const newHotel = req.body;
      
                  console.log("Received form data:", newHotel);
                  console.log("Received image files:", imageFiles.map(file => file.originalname));
      
                  // Upload the images to Cloudinary
                  const uploadPromises = imageFiles.map(async (image) => {
                      const b64 = Buffer.from(image.buffer).toString("base64");
                      const dataURL = "data:" + image.mimetype + ";base64," + b64;
                      console.log(`Uploading image to Cloudinary: ${image.originalname}`);
                      const result = await cloudinary.uploader.upload(dataURL);
                      console.log(`Uploaded image URL: ${result.url}`);
                      return result.url;
                  });
      
                  // Add the URLs to the new hotel if upload was successful
                  const imageUrls = await Promise.all(uploadPromises);
                  newHotel.imgUrls = imageUrls;
                  newHotel.lastUpdated = new Date();
                  newHotel.userId = req.userId;
      
                  console.log("Final hotel data to save:", newHotel);
      
                  // Save the new hotel in the database
                  const hotel = new Hotel(newHotel);
                  await hotel.save();
      
                  // Return a 201 status
                  console.log("Hotel saved successfully");
                  res.status(201).send(hotel);
              } catch (error) {
                  console.error("Error saving hotel:", error);
                  res.status(500).json({ message: "Internal server error", error });
              }
          }
      );
      
      export default router;
      
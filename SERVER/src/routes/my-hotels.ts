import express, { Request, Response } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";
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
    // [
    //     body("name").notEmpty().withMessage("Name is required"),
    //     body("city").notEmpty().withMessage("City is required"),
    //     body("country").notEmpty().withMessage("Country is required"),
    //     body("description").notEmpty().withMessage("Description is required"),
    //     body("type").notEmpty().withMessage("Hotel type is required"),
    //     body("pricePerNight").isNumeric().withMessage("Price per night must be a number"),
    //     body("facilities").isArray().withMessage("Facilities must be an array"),
    //     body("starRating").isNumeric().withMessage("Star rating must be a number"),
    // ],
    upload.array("imageFiles", 6),
    async (req: Request, res: Response) => {

        // Check for validation errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const imageFiles = req.files as Express.Multer.File[];
            const newHotel = req.body;

            // Upload the image to Cloudinary
            const uploadPromises = imageFiles.map(async (image) => {
                const b64 = Buffer.from(image.buffer).toString("base64");
                const dataURL = "data:" + image.mimetype + ";base64," + b64;
                const result = await cloudinary.uploader.upload(dataURL);
                return result.url;
            });

            // Add the URLs to the new hotel if upload was successful
            const imageUrls = await Promise.all(uploadPromises);
            newHotel.imgUrls = imageUrls;
            newHotel.lastUpdated = new Date();
            newHotel.userId = req.userId;

            // Save the new hotel in the database
            const hotel = new Hotel(newHotel);
            await hotel.save();

            // Return a 201 status
            res.status(201).send(hotel);
        } catch (error) {
            console.error("Error saving hotel:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
);

export default router;


import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body, validationResult } from "express-validator";
import Hotels from "../models/hotel"

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
        // console.log("Received request to add a new hotel");


        try {
            const imageFiles = req.files as Express.Multer.File[];
            const newHotel: HotelType = req.body;

           // console.log("Received form data:", newHotel);
            // console.log("Received image files:", imageFiles.map(file => file.originalname));

            // Upload the images to Cloudinary
            const imageUrls = await uploadImages(imageFiles);
            
            newHotel.imageUrls = imageUrls;
            newHotel.lastUpdated = new Date();
            newHotel.userId = req.userId;

            // console.log("Final hotel data to save:", newHotel);

            // Save the new hotel in the database
            const hotel = new Hotel(newHotel);
            await hotel.save();

            // Return a 201 status
            // console.log("Hotel saved successfully");
            res.status(201).send(hotel);
        } catch (error) {
            console.error("Error saving hotel:", error);
            res.status(500).json({ message: "Internal server error", error });
        }
    }
);

router.get("/", verifyToken , async (req: Request, res: Response)=>{
     try {
        const hotels = await Hotels.find({ userId: req.userId})
        // console.log("------Hotel`s fetch reqest-----")
        // console.log(hotels)
        res.json(hotels)
     } catch (error) {
        res.status(500).json({message: "Error fetching hotels"})
     }
})

router.get("/:id", verifyToken, async (req: Request, res:Response)=>{
    const id = req.params.id.toString()
    try {
       const hotel = await Hotel.findOne({
        _id: id,
        userId: req.userId,
       })
        res.json(hotel);
    } catch (error) {
        res.status(500).json({message: "Error fetching hotels"})
    }
})

router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      console.log('Request received to update hotel:', req.params.hotelId);
      const updatedHotel: HotelType = req.body;

      updatedHotel.lastUpdated = new Date();
  
      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: req.params.hotelId,
          userId: req.userId,
        },
        updatedHotel,
        { new: true }
      );
  
      if (!hotel) {
        console.log('Hotel not found for id:', req.params.hotelId);
        return res.status(404).json({ message: "Hotel not found" });
      }
  
      const files = req.files as Express.Multer.File[];
      console.log('Files received:', files.length);
      
      const updatedImageUrls = await uploadImages(files);
      console.log('Uploaded image URLs:', updatedImageUrls);
  
      hotel.imageUrls = [
        ...updatedImageUrls,
        ...(updatedHotel.imageUrls || []),
      ];
  
      await hotel.save();
      console.log('Hotel successfully updated:', hotel);
      res.status(201).json(hotel);
    } catch (error) {
      console.error('Error updating hotel:', error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);
router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      const { hotelId } = req.params;
      console.log('Request received to update hotel:', hotelId);
      console.log('Full URL:', req.originalUrl);
      console.log('Request body:', req.body);

      if (!hotelId) {
        return res.status(400).json({ message: "Hotel ID is required" });
      }

      const updatedHotel: HotelType = req.body;
      console.log('Parsed updatedHotel:', updatedHotel);

      updatedHotel.lastUpdated = new Date();

      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: hotelId,
          userId: req.userId,
        },
        updatedHotel,
        { new: true }
      );

      if (!hotel) {
        console.log('Hotel not found for id:', hotelId);
        return res.status(404).json({ message: "Hotel not found" });
      }

      const files = req.files as Express.Multer.File[];
      console.log('Files received:', files.length);

      const updatedImageUrls = await uploadImages(files);
      console.log('Uploaded image URLs:', updatedImageUrls);

      hotel.imageUrls = [
        ...updatedImageUrls,
        ...(updatedHotel.imageUrls || []),
      ];

      await hotel.save();
      console.log('Hotel successfully updated:', hotel);
      res.status(201).json(hotel);
    } catch (error) {
      console.error('Error updating hotel:', error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);


export default router;
async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        const dataURL = "data:" + image.mimetype + ";base64," + b64;
        // console.log(`Uploading image to Cloudinary: ${image.originalname}`);
        const result = await cloudinary.v2.uploader.upload(dataURL);
        // console.log(`Uploaded image URL: ${result.url}`);
        return result.url;
    });

    // Add the URLs to the new hotel if upload was successful
    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}


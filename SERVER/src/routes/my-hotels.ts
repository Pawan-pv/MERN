
import express, {Request , Response} from "express";
import multer, { memoryStorage } from "multer"
import { v2 as cloudinary } from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router()

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 5* 1024 *1024 //5mb
    }
})

router.post("/", 
    verifyToken,
    [
    
       body("name").notEmpty().withMessage("Number is required"),
       body("city").notEmpty().withMessage("city is required") ,
       body("country").notEmpty().withMessage("country is required") ,
       body("description").notEmpty().withMessage("description is required") ,
       body("type").notEmpty().withMessage("Hotel type is required") ,
       body("pricePerNight").notEmpty().withMessage("it must be a Number") ,
       body("facilities").notEmpty().withMessage("facilities are required") ,
       body("starRating").notEmpty().withMessage("Number is required") ,
       
    ],
    upload.array("imageFiles", 6),
    async (req: Request, res: Response)=>{
        try {
            const imageFiles = req.files as Express.Multer.File[];
            const newHotel: HotelType = req.body;

            //1. upload the image to cloudinary

            const uploadPromises = imageFiles.map( async(image)=>{
                const b64 = Buffer.from(image.buffer).toString("base64")
                let dataURL = "data:" + image.mimetype + ";base65,"  + b64;
                const res = await cloudinary.uploader.upload(dataURL)
                return res.url;
            })

            //2. if upload was successful , add thr URLs to the new hotel
            const imageUrls = await Promise.all(uploadPromises)
            newHotel.imgUrls = imageUrls;
            newHotel.lastUpdated = new Date();
            newHotel.userId = req.userId;

            //3. save the new hotel in our database
            const hotel = new Hotel(newHotel);
            await hotel.save();

            //4. return a 201 status
            res.status(201).send(hotel);
 
        } catch (error) {
            console.log(error)
        }

        
})

export default router;
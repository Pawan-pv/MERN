"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const hotel_1 = __importDefault(require("../models/hotel"));
const auth_1 = __importDefault(require("../middleware/auth"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});
// api/my-hotels
router.post("/", auth_1.default, 
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
upload.array("imageFiles", 6), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check for validation errors
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const imageFiles = req.files;
        const newHotel = req.body;
        // Upload the image to Cloudinary
        const uploadPromises = imageFiles.map((image) => __awaiter(void 0, void 0, void 0, function* () {
            const b64 = Buffer.from(image.buffer).toString("base64");
            const dataURL = "data:" + image.mimetype + ";base64," + b64;
            const result = yield cloudinary_1.v2.uploader.upload(dataURL);
            return result.url;
        }));
        // Add the URLs to the new hotel if upload was successful
        const imageUrls = yield Promise.all(uploadPromises);
        newHotel.imgUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;
        // Save the new hotel in the database
        const hotel = new hotel_1.default(newHotel);
        yield hotel.save();
        // Return a 201 status
        res.status(201).send(hotel);
    }
    catch (error) {
        console.error("Error saving hotel:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.default = router;

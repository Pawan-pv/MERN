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
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post("/login", [
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });
        res.status(200).json({ userID: user.id, message: "Login successful" });
    }
    catch (error) {
        console.error("Something went wrong", error);
        res.status(500).json({ message: "Server error" });
    }
}));
router.get("/validate-token", auth_1.default, (req, res) => {
    res.status(200).send({ userId: req.userId });
});
router.post("/logout", (req, res) => {
    res.cookie("auth_token", {
        expires: new Date(0),
    });
    res.send();
});
exports.default = router;
// Alternate code some optimistic or cleaner way and you find way to write middleware
// import { Router, Request, Response, NextFunction } from "express";
// import { check, validationResult } from "express-validator";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User"; // Assuming you have a User model
// import verifyToken from "../middleware/verifyToken"; // Assuming you have a middleware for token verification
// const router = Router();
// // Middleware for validating login request
// const validateLoginRequest = [
//   check("email", "Email is required").isEmail(),
//   check("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
// ];
// // Middleware for checking validation results
// const checkValidationResults = (req: Request, res: Response, next: NextFunction) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   next();
// };
// // Route handler for login
// const loginHandler = async (req: Request, res: Response) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }
//     const token = jwt.sign(
//       { userId: user.id },
//       process.env.JWT_SECRET_KEY as string,
//       { expiresIn: "1d" }
//     );
//     res.cookie("auth_token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 86400000,
//     });
//     res.status(200).json({ userID: user.id, message: "Login successful" });
//   } catch (error) {
//     console.error("Something went wrong", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// // Login route with middleware
// router.post(
//   "/login",
//   validateLoginRequest,
//   checkValidationResults,
//   loginHandler
// );
// // Token validation route
// router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
//   res.status(200).send({ userId: req.userId });
// });
// export default router;

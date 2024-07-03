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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
// Register route: /api/users/register
router.post("/register", [
    (0, express_validator_1.check)("firstName", "First Name is required").isString(),
    (0, express_validator_1.check)('lastName', 'Last Name is required').isString(),
    (0, express_validator_1.check)('email', 'Email is required').isEmail(),
    (0, express_validator_1.check)('password', 'Password is required and must be at least 6 characters long').isLength({ min: 6 })
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, firstName, lastName, password } = req.body;
    try {
        let user = yield user_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        user = new user_1.default({ email, firstName, lastName, password });
        yield user.save();
        // jwt.sign(payload, secretOrPrivateKey, [options, callback])
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, // payload
        process.env.JWT_SECRET_KEY, // secretOrPrivateKey
        { expiresIn: "1d" } // options
        );
        res.cookie("auth_token", token, {
            httpOnly: true, // Cookie accessible only by the web server
            secure: process.env.NODE_ENV === "production", // Cookie sent only over HTTPS in production
            maxAge: 86400000, // Cookie expires in 1 day (milliseconds)
        });
        return res.status(200).send({ message: "User registered successfully" });
    }
    catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
exports.default = router;

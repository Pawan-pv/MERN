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
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = __importDefault(require("./routes/auth"));
const my_hotels_1 = __importDefault(require("./routes/my-hotels"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cloudinary_1 = require("cloudinary");
const path_1 = __importDefault(require("path"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRETE,
});
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
console.log(process.env.FRONTEND_URL);
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "../../CLIENT/dist")));
app.use("/api/auth", auth_1.default);
// http://localhost:8000/api/auth/login
// http://localhost:8000/api/auth/validate-token
// http://localhost:8000/api/auth/logout
app.use("/api/users", user_1.default);
// http://localhost:8000/api/users/register
app.use("/api/my-hotels", my_hotels_1.default);
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(process.env.MONGO_URL)
        // await mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)
        .then(() => {
        app.listen(8000, () => {
            console.log("DB IS CONNECTED  TO ( E2E )SUCSESSFULLY ");
            console.log("Server is running on port 8000");
        });
    });
}))();

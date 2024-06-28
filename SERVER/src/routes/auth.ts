import express, { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken"
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
    const token = jwt.sign(
        {userId: user.id},
        process.env.JWT_SECRET_KEY as string,
        {
            expiresIn: "1d"
        }
    );
    res.cookie("auth_token", token,{
        httpOnly: true,
        secure: process.env.NODE_ENV ==="production",
        maxAge: 86400000,
    })

      res.status(200).json({userID: user.id  ,message: "Login successful" });
    } catch (error) {
      console.error("Something went wrong", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.get("/validate-token", verifyToken, (req: Request, res: Response)=>{
  res.status(200).send({userId: req.userId})
})

export default router;


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

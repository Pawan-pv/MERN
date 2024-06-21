import express, { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken"

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

export default router;

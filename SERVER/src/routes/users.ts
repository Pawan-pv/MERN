import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from 'express-validator';

const router = express.Router();

// Register route: /api/users/register

router.post(
    "/register",
        [
        check("firstName", "First Name is required").isString(),
        check('lastName', 'Last Name is required').isString(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required and must be at least 6 characters long')
        .isLength({ min: 6 })
        ],
        async (req: Request, res: Response) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400)
            .json({ errors: errors.array() });
        }

        const { email, firstName, lastName, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400)
                .json({ message: "User already exists" });
            }

            user = new User({ email, firstName, lastName, password });
            await user.save();

            // jwt.sign( payload, secretOrPrivateKey, [options, callback] )
            const token = jwt.sign(
                { userId: user.id },                   // payload
                process.env.JWT_SECRET_KEY as string,  // secretOrPrivateKey
                { expiresIn: "1d" }                    // options
              );
              

              res.cookie("auth_token", token, {
                httpOnly: true,                          // Cookie accessible only by the web server
                secure: process.env.NODE_ENV === "production",  // Cookie sent only over HTTPS in production
                maxAge: 86400000,                        // Cookie expires in 1 day (milliseconds)
              });


            return res.status(200).send({ message: "User registered successfully" });
            
        } catch (error) {
            console.error("Error during registration:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
);

export default router;

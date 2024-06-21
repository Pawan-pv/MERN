import express, {Request, Response} from "express"
import User from "../models/user";
<<<<<<< HEAD
import jwt from "jsonwebtoken"
import { check, validationResult } from 'express-validator';
 

    const router = express.Router();


//-------------->/api/users/register
    router.post(
        "/register", 
        [
            check("firstName", "First Name is required").isString(),
            check('lastName', 'Last Name is required').isString(),
            check('email', 'Email is required').isEmail(),
            check('password', 'Password is required and must be at least 6 characters long').isLength({ min: 6 })
        ],
        async (req: Request, res: Response)=>{
            const error = validationResult(req);
            if(!error.isEmpty()){
                return res.status(400).json({ message: error.array() })
            }
=======

    const router = express.Router();
    
    router.post("/register", async (req: Request, res: Response)=>{
>>>>>>> d2e176d01f87f7de6b3c6ccc7838123bd6dd4700
        try {
        let user = await User.findOne({
        email: req.body.email,
    })
    
    if(user){
        return res.status(400).json({message: "User already exists"})
    }
    
       user= new User(req.body);
       await user.save();
<<<<<<< HEAD

       const token = jwt.sign({userId: user.id  },
        process.env.JWT_SECRET_KEY as string ,
        { expiresIn: "1d"  }
       ) 
       
       res.cookie("auth_token", token, {
        httpOnly:  true, 
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000
       })
       
       res.sendStatus(200);
=======
>>>>>>> d2e176d01f87f7de6b3c6ccc7838123bd6dd4700
    
        } catch (error) {
            console.log("",error)
        }
    })
<<<<<<< HEAD


    export default router


=======
>>>>>>> d2e176d01f87f7de6b3c6ccc7838123bd6dd4700

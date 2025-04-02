import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Model/User.js';
import dotenv from 'dotenv';

// configuring the environment variables
dotenv.config();

// initialising express.Router
const router = express.Router();

// user signup
router.post('/signup',async(req,res) => {
    try{
        const {username,email,password} = req.body;

        if(!username || !email ||!password){
            res.status(400).json({msg:"username,email and password are required.."})
        }

        // 10 is the number of salt rounds here, salt rounds simply means the number of times password will be hashed recursively, higher salt round safer the password but more the time required, 
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User ({
            username: username,
            email : email,
            password: hashedPassword
        })

        // .save is the method to save the data in the mongodb database 
        await newUser.save();

        res.status(200).json({msg:"user registered successfully.."})

    }catch(err){
        res.status(500).json({msg:"internal server error..",err})
        console.log(err)
    }
})

//User login
//to let the user login we need to check if he is signed up, 
router.post('/login',async(req,res) => {
    try {
        const {email,password} = req.body;
        //User is the reference for the journal-users collection in the database; 
        const user = await User.findOne({email});

        // user refers to the user with the email sent in the body
        if(!user){
            res.status(404).json({msg:"user not found"})
        }

        // here with the help of bcrypt we are comparing the password sent in the body with the password of the user,if they match it returns true else it returns false,
        const isMatch = await bcrypt.compare(password,user.password);

        // if isMatch is false the message sent is invalid ccredentials,
        if(!isMatch){
            res.status(401).json({msg:"invalid credentials.."})
        }

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1h"})

        res.status(200).json({token});
    }catch(err){
        res.status(500).json({msg:"internal server error.."})
    }
})



export default router;
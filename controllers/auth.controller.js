import mongoose from 'mongoose';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from '../config/env.js';

export const signUp = async (req, res, next) => {
    console.log("Inside signup controller");
    //here session is mongoose session and not user session
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser) {
            const error = new Error("user already Exists");
            error.statusCode = 409;
            throw error;
        }

        //otherwise hash password and create user

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        }, {session});
        //if some error occurs during save operation it will be caught in catch block as we have used session and user will not be commited to DB

        const token = jwt.sign({userId : newUser._id}, JWT_SECRET_KEY, {expiresIn: JWT_EXPIRES_IN})

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            message: "User created successfully",
            token,
            user: { id: newUser._id, username: newUser.name, email: newUser.email }
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signIn = async (req, res, next) => {

}

export const signOut = async (req, res, next) => {

}
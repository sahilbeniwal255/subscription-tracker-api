import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { JWT_SECRET_KEY } from '../config/env.js';

export const autherization = async (req, res, next) => {
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token){
            return res.status(401).json({"success" : false, "message" : "Not authorized, no token"});
        }

        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(401).json({"success" : false, "message" : "Not authorized, user not found"});
        }

        req.user = user;
        next();

    } catch (error) {
        console.log(error)
        return res.status(401).json({"success" : false, "message" : "Not authorized"});
    }

}

export const autherizationAdmin = async (req, res, next) => {
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token){
            return res.status(401).json({"success" : false, "message" : "Not authorized, no token"});
        }

        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(401).json({"success" : false, "message" : "Not authorized, user not found"});
        }

        if(user.email !== "admin@example.com") {
            return res.status(403).json({"success" : false, "message" : "Forbidden, admin access only"});
        }
        req.user = user;
        next();

    } catch (error) {
        console.log(error)
        return res.status(401).json({"success" : false, "message" : "Not authorized"});
    }

}
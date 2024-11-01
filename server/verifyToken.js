import jwt from "jsonwebtoken"
import { createError } from "./errors.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(404, "You are not authenticated!"))
    }


    jwt.verify(token, process.env.JWT, (err, user) => {
        if(err) return next(createError(403, "Invalid token!"));
        req.user = user;
        next()
    })

}
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
dotenv.config();
export const UserMiddleware=(req,res,next)=>{
    const header=req.headers["authorization"];
    const decoded=jwt.verify(header,process.env.JWT_SECRET);
    if (!decoded) {
        return res.status(401).json({ message: "Token not provided" });
    }
    try {
        req.userId = decoded.id;
        next();
    } catch (e) {
        console.error(e);
        return res.status(403).json({ message: "Invalid token" });
    }
}
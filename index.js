import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Content, User } from "./db.js";
import dotenv from 'dotenv';
dotenv.config();
import { connectDb } from "./db.js";
import { UserMiddleware } from "./middleware.js";
await connectDb();
const app=express();
app.use(express.json());

app.post("/api/v1/signup",async (req,res)=>{
    try{
    const Username=req.body.Username;
    const password=req.body.password;
    await User.create({
        Username:Username,
        password:password})
        res.json({
            message:"User created"
        })
    }
    catch(e){
        res.status(411).json({
            message:"User already exists"
        })
    }
})
app.post("/api/v1/signin",async (req,res)=>{
    const Username=req.body.Username;
    const password=req.body.password;
    const existingUser=await User.findOne({
        Username,
        password});
    if(existingUser){
        const token=jwt.sign({id:existingUser._id},process.env.JWT_SECRET);
        res.json({
            token
        })
    }else{
        res.status(403).json({
            message:"wrong credentials"
        })
    }
})
app.post("/api/v1/content",UserMiddleware,async (req,res)=>{
    const link=req.body.link;
    // const type=req.body.type;
    const title=req.body.title;
    // const tags=req.body.tags;
    // const userId=req.userId;
    await Content.create({
        link,
        title,
        tags:[],
        userId:req.userId
    })
    res.json({
        message:"content added"
    })
})
app.get("/api/v1/content",UserMiddleware,async (req,res)=>{
    const userId=req.userId;
    const contents = await Content.find({
        userId
    }).populate("userId","Username");
    res.json({
        contents
    })

})
app.delete("/api/v1/content",UserMiddleware,async (req,res)=>{
    const contentId=req.body.contentId;
    await Content.deleteMany({
        _id:contentId,
        userId:req.userId
    })
    res.json({
        message:"Deleted"
    })
})
app.post("/api/v1/brain/share",(req,res)=>{

})
app.get("/api/v1/brain/:shareLink",(req,res)=>{

})
app.get("/",(req,res)=>{
    res.send("server is listening")
})

app.listen(3000,() => {
    console.log("Server is running on http://localhost:3000");
  });
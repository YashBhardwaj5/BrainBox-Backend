import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "./db.js";
import { connectDb } from "./db.js";
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
        res.status(500).json({
            message:"error:"+e
        })
    }
})
app.post("/api/v1/signin",(req,res)=>{

})
app.get("/api/v1/content",(req,res)=>{

})
app.delete("/api/v1/content",(req,res)=>{

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
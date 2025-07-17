import mongoose, { Types } from "mongoose";
import { Schema,model } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
export const connectDb=async()=>{
    try {await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb connected...");
    }
    catch(e){
        console.error("some error occured",e.message);
        process.exit(1);
    }
}
const UserSchema= new Schema({
    Username: {type:String , required:true,unique:true},
    password: {type:String,required:true}
})
export const User=model('User',UserSchema);
const tagSchema = new Schema({
    title:{type:String,required:true,unique:true}
})
export const Tag=model('Tag',tagSchema);
const linkSchema=new Schema({
    hash: {type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}
})
const contentTypes=['image','video','article','audio'];
const contentSchema=new Schema({
    link:{type:String,required:true},
    type:{type:String,enum:contentTypes,required:true},
    title:{type:String,required:true},
    tags:[{type:Types.ObjectId,ref:'Tag'}],
    userId:{type:Types.ObjectId,ref:'User',required:true}
})





import mongoose from "mongoose";
import { Schema,model } from "mongoose";
// import Model,Schema

const UserSchema= new Schema({
    name: {type:String , required:true},
    email: {type:email,required:true, unique:true},
    password: {type:String,required:true}
})
export const User=model('User',UserSchema);


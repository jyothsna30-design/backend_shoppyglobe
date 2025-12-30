import mongoose from "mongoose";
//defining userschema and usermodel
const userschema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true},
    password: {type:String,required:true}});

const usermodel = mongoose.model("User",userschema);
export default usermodel;

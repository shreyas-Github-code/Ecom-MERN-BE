import mongoose from "mongoose";


const schema = new mongoose.Schema({},{timestamps:true,});

export const User = mongoose.model("User",schema);
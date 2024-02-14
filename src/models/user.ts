import mongoose from "mongoose";
import validator from "validator";

interface IUser extends Document {
    _id:string;
    name:string;
    email:string;
    photo:string;
    role:"admin"|"user";
    gender:"male"|"femail";
    dob:Date,
    createdAt:Date;
    updatedAt:Date;
    age:number;
}

const schema = new mongoose.Schema(
    {
    _id: { type: String, required: [true, "Plese enter ID"] },
    name: { type: String, required: [true, "Plese enter Name"] },
    email: { type: String, unique: [true, "Email Alredy Exist"],required: [true, "Plese enter Email"],validate:validator.default.isEmail},
    photo: { type: String, required: [true, "Plese add Photo"] },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    gender: { type: String, enum: ["male", "female"], required: [true, "Plese enter Gender"]},
    dob: { type: Date, required: [true, "Plese enter Your Date of birth"]},

}, 
{ timestamps: true, });

schema.virtual("age").get(function(){
    const today = new Date();
    
    const dob = this.dob;
    let age = today.getFullYear()-dob.getFullYear();

    if(today.getMonth()<dob.getMonth() || 
    today.getMonth()===dob.getMonth() && today.getDate()<dob.getDate())
    {
        age--;
    }
        return age;
    
});
export const User = mongoose.model("User", schema);
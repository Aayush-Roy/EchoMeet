import {User} from "../models/user.model.js"
import httpStatus from "http-status";
import bcrypt,{hash} from "bcrypt";
const register = async(req,res)=>{
    const {name,username,password} = req.body;
    try{
        const existingUser = await User.find({username});
        if(existingUser){
            return res.status(httpStatus.FOUND).json({message:"User already exists"});
        } 
        const hashedPassword = await bcrypt.hash(password)
        const newUser = new User({
            name:name,
            username:username,
            password:hashedPassword
        });
        await newUser.save();
        res.status(httpStatus.CREATED).json({message:"User Registered"})
    }catch (e){
        res.json({message:`Something went wrong ${e}`})
    }
}
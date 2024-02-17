import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async(req,res)=>{
    try {
        const {name,email,password,phone,address,answer}=req.body;
        
        if(!name){
            return res.send({message:'Name is required'});
        }
        if(!email){
            return res.send({message:'Email is required'});
        }
        if(!password){
            return res.send({message:'password is required'});
        }
        if(!phone){
            return res.send({message:'phone is required'});
        }
        if(!address){
            return res.send({message:'Address is required'});
        }
        if(!answer){
            return res.send({message:'Answer is required'});
        }

        const existingUser = await userModel.findOne({email});
        
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'Already Registered User',
            })
        }
       const hashedPassword = await hashPassword(password);

       const user = await new userModel({
         name,
         email,
         phone,
         address,
         password:hashedPassword,
         answer
       }).save()
       res.status(201).send({
        success:true,
        message:'User Register Successfully',
        user
       })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Registeration',
            error
        })
    }
}


export const loginController = async(req,res)=>{
    try {
        const {email,password} = req.body;
        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or password'
            })
        }
        //check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not Registered'
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid password'
            })
        }

        const token = await JWT.sign({_id:user._id},process.env.JWT_secret,{
            expiresIn:"100D"
        });
       res.status(200).send({
        success:true,
        message:"Login Successfully",
        user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            address:user.address,
            role:user.role,
        },
        token,
       })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        })
    }
}

//forgot password 
export const forgotPasswordController = async(req,res)=>{
    try {
        const {email,answer,newPassword} = req.body;

        //Validation
        if(!email){
            res.status(400).send({message:'Email is required'})
        }

        if(!answer){
            res.status(400).send({message:'Answer is required'})
        }

        if(!newPassword){
            res.status(400).send({message:'New Password is required'});
        }

        //check
        const user = await userModel.findOne({email})

        //Validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Wrong Email or Answer'
            })
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id,{password:hashed})
        res.status(200).send({
            success:true,
            message:"Password Reset Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Something went to wrong',
            error
        })
    }
}
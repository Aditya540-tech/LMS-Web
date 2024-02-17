import courceModel from "../models/courceModel.js";
import slugify from "slugify";
//create cource
export const createCourceController = async(req,res)=>{
    try {
        const {name} = req.body;
        if(!name){
            return res.status(401).send({message:'Name is required'})
        }
        const existingCource = await courceModel.findOne({name})
        if(existingCource){
            return res.status(200).send({
                success:true,
                message:'Cource Already Exist'
            })
        }
        const cource= await courceModel({name,slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:'New Cource Added',
            cource
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Cource',
            error
        })
    }
}

//Update Cource

export const updateCourceController = async(req,res) =>{
    try {
        const {name} =req.body
        const {id} =req.params;
        const cource = await courceModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        
        res.status(200).send({
            success:true,
            message:'Cource Updated Successfully',
            cource
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in updating Cource',
            error
        })
    }
}

//get all cource
export const courceControler = async(req,res)=>{
    try {
        const cource = await courceModel.find({})
        res.status(200).send({
            success:true,
            message:'All Cource List',
            cource
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting all cource'
        })
    }
}

//single cource
export const singleCourceController = async(req,res) =>{
    try {
        const cource = await courceModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:'Get Single Cource',
            cource
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error,
            message:'Error while getting single cource'
        })
    }
}

export const deleteCourceController = async (req,res)=>{
    try {
        const {id} =req.params
        await courceModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:'Coruce Deleted Successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Deleting the Cource'
        })
    }
}
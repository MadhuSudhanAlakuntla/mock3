const express=require("express");

const { DoctorModel } = require("../models/productModels");

const AppointmentController=express.Router();

AppointmentController.get("/",async(req,res)=>{
    try{
        const page=parseInt(req.query.page)-1||0;
        const limit=parseInt(req.query.limit);
        const q=req.query.q || "";
        var sort=req.query.sort ;
        let department=req.query.department || "All";

        

        req.query.sort?(sort=req.query.sort.split(",")):(sort=[sort]);
        let sortBy={};
        if(sort[1]){
            sortBy[sort[0]]=sort[1];
        }
        else{
            sortBy[sort[0]]="asc";
        }

        const employee=await DoctorModel.find({$or:[{first_name:{$regex:q,$options:"i"}},
        {salary:{$regex:q,$options:"i"}},{department:{$regex:q,$options:"i"}}]})
        .sort(sortBy).skip(page*limit).limit(limit);
        const response={
            error:false,
            page:page+1,
            limit,
            employee
        }
        res.status(200).json(response);
    }
    catch(error){
        res.status(500).json({error:true,message:"server Error"});
    }
})

// create
AppointmentController.post("/create", async (req,res)=>{
    const{first_name,last_name,email,department,salary,date}=req.body;

    
    const Employee_data=await DoctorModel.create({first_name,last_name,email,department,salary,date});
    res.send({data:Employee_data});
})

// update
AppointmentController.patch("/edit/:empId",async (req,res)=>{
    const empId=req.params.empId;

    const payload=req.body;
    await DoctorModel.findOneAndUpdate({_id:empId},payload);
    res.send({message:`employee ${empId} Data updated`});
})

// delete
AppointmentController.delete("/delete/:empId",async (req,res)=>{
    const empId=req.params.empId;

    await DoctorModel.findOneAndDelete({_id:empId});
    res.send({message:`employee ${empId} Data deleted`});
})



module.exports={
    AppointmentController
}
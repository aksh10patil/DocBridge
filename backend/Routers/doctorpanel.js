const express = require("express");
const router = express.Router();
const zod = require("zod");
const { Doctorintro } = require("../mongodb/db");


const descriptionSchema = zod.object({
    name: zod.string(),
    fee: zod.string(),
    experience: zod.string(),
    speciality: zod.string(),
    address: zod.string(),   
    State: zod.string(),
    district: zod.string(),      
    age: zod.string(),
    education: zod.string(),
    about: zod.string()
})

router.post("/description", async(req,res)=>{
    const payload = descriptionSchema.safeParse(req.body);
    if(!payload){
        return res.status(404).json({
            message: "Schemas not verified"
        })
    }
    const Doctor = await Doctorintro.create({
        name: req.body.name,
        fee: req.body.fee,
        experience: req.body.experience,
        speciality: req.body.speciality,
        address: req.body.address,
        State: req.body.State,
        district: req.body.district,
        age: req.body.age,
        education: req.body.education,
        about: req.body.about
    })
    const Doctorid = Doctor._id;
    return res.json({
        Message: "Doctor details has succesfully feeded",
        Doctorid: Doctorid
    })
})

router.get("/doctorsdetail", async(req,res)=>{
    const doctors = await Doctorintro.find();

    if(doctors.length==0){
        return res.status(404).json({
            message: "no doctor is found on the database"
        })
    }
    
    return res.json({
        message: "doctor has been found succesfully",
        doctors
    })
})

router.get("/particulardetail", async(req,res)=>{
    const {id} = req.query;
    const doctors = await Doctorintro.findOne({_id : id});
    if(!id){
        return res.json({
            message:"id is not found in this "
        })
    }
    if(doctors){
        return res.json({
            message: "particular doctor has been found",
            doctors
        })
    }else{
        return res.status(404).json({
            message: "error in finding the doctor"
        })
    }
})
module.exports = router;
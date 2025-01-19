const express = require("express");
const zod = require("zod");
const { PatientINFO } = require("../mongodb/db");
const router = express.Router();
const mongoose = require("mongoose");

const patientinfo = zod.object({
    name: zod.string(),
    height: zod.string(),
    weight: zod.string(),
    age: zod.string(),
    bloodtype: zod.string(),
    gender: zod.string(),
    healthconcern: zod.string(),
})

router.get("/testing",(req,res)=>{
    res.send("hello hi from the patientpanel")
})

router.post("/patientinfo", async(req,res)=>{
    const payload = patientinfo.safeParse(req.body);
    if(!payload){
        return res.status(404).json({
            message: "body is not recieved in this element"
        })
    }
    const patient = await PatientINFO.create({
        name: req.body.name,
        height: req.body.height,
        weight: req.body.weight,
        age: req.body.age,
        bloodtype: req.body.bloodtype,
        gender: req.body.gender,
        healthconcern: req.body.healthconcern,
    })

    res.json({
        message: "Patient info has been saved",
        patient
    })
})

router.get("/particularpatient", async(req,res)=>{
    const {patientid} = req.query;
    const patient = await PatientINFO.findOne({_id : patientid});
    if(!patientid){
        return res.json({
            message:"patient ID is not found in this "
        })
    }
    if(patient){
        return res.json({
            message: "particular patient has been found",
            patient
        })
    }else{
        return res.status(404).json({
            message: "error in finding the doctor"
        })
    }
})

router.get("/userpng", async(req,res)=>{
    const ID = req.query.id;
    const patient = await PatientINFO.findOne({_id: ID})
    if(patient){
        return res.json({
            message: "patient details",
            patient
        })
    }
})


router.put("/update", async (req, res) => {
    try {
        const { id } = req.query; // Extract 'id' from req.query
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const { name, height, weight, age, bloodtype, gender, healthconcern } = req.body;

        // Build the update object dynamically
        const updateFields = {};
        if (name !== undefined) updateFields.name = name;
        if (height !== undefined) updateFields.height = height;
        if (weight !== undefined) updateFields.weight = weight;
        if (age !== undefined) updateFields.age = age;
        if (bloodtype !== undefined) updateFields.bloodtype = bloodtype;
        if (gender !== undefined) updateFields.gender = gender;
        if (healthconcern !== undefined) updateFields.healthconcern = healthconcern;

        // Perform the update
        const update = await PatientINFO.updateOne(
            { _id: new mongoose.Types.ObjectId(id) },
            { $set: updateFields }
        );

        if (update.nModified > 0 || update.matchedCount > 0) {
            return res.json({ message: "User updated successfully", update });
        } else {
            return res.status(404).json({ message: "User not found or no changes applied" });
        }
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
});



module.exports = router;
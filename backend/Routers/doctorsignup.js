const express = require("express");
const router = express.Router();
const zod = require("zod");
const { Docsignup } = require("../mongodb/db");
const { JWT_SECRET } = require("../middleware/config");
const jwt = require("jsonwebtoken");

const docsignupschema = zod.object({
    firstname: zod.string(),
    lastname: zod.string(),
    email: zod.string(),
    password: zod.string()
})
const docsigninschema = zod.object({
    email: zod.string(),
    password: zod.string()
})

router.get("/testing", (req,res)=>{
    res.send("hi hello form the doctor page");
})

router.post("/docsignup",async(req,res)=>{
    const payload = docsignupschema.safeParse(req.body);
    if(!payload){
        return res.status(404).json({
            message: "body is not recieved"
        })
    }
    const existingdoc = await Docsignup.findOne({
        email: req.body.email,
    })
    if(existingdoc){
        return res.status(404).json({
            message: 'emailname is already registered, try to do signin'
        })
    }
    const doctorinfo = await Docsignup.create({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        password : req.body.password
    })
    const UserId = doctorinfo._id;
    const token = jwt.sign({
        UserId
    }, JWT_SECRET)
    return res.json({  
        message: "docsignup created succesfully",
        Userid: UserId,
        token: token

    })
})
router.post("/docsignin",async(req,res)=>{
    const payload = docsigninschema.safeParse(req.body);
    if(!payload.success){
        return res.status(404).json({
            message: "body is not recieved"
        })
    }
    const User = await Docsignup.findOne({
        email: req.body.email,
        password: req.body.password
    })
    let token;
    if(User){
        token = jwt.sign({
            UserId: User._id,
        },JWT_SECRET)
        return res.json({
            message : "User is signin succesfully",
            token
        })
    }else{
        return res.status(404).json({
            message: "Email is not found, try to do signup" 
        })
    }
})
module.exports = router;
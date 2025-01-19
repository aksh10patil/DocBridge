const express = require("express");
const router = express.Router();
const userrouter = require('./users');
const doctorpanel = require("./doctorpanel");
const patientpanel = require("./patientpanel");
const appointmentpanel = require("./appointmentpanel");
const doctorsignup = require("./doctorsignup")

router.use("/user", userrouter);
router.use("/doctorpanel", doctorpanel);
router.use("/patientpanel", patientpanel);
router.use("/appointmentpanel", appointmentpanel);
router.use("/doctorsignup",doctorsignup);

module.exports = router;
